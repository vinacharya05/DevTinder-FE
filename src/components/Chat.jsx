import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const { targetUserId } = useParams();
    const user = useSelector(store => store.user);
    const userId = user?._id;
    const [messages, setMessages] = useState([]);
    const [userMsgInput, setUserMessageInput] = useState("");
    // Store socker ref
    const socketRef = useRef(null);
    const chatEndRef = useRef(null);

    useEffect(() => {
        const fetchChatMessages = async () => {
            try {
                const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, { withCredentials: true });
                console.log(chat);
                const messages = chat?.data?.chat?.messages?.map(message => ({ firstName: message.senderId.firstName, lastName: message?.senderId?.lastName, photoUrl: message?.senderId?.photoUrl, text: message.text }));
                setMessages(messages);
                  
            } catch (err) {
                console.log(err);
            }
        }
        fetchChatMessages();
    }, []);

    useEffect(() => {
        if (!userId) {
            return;
        }

        socketRef.current = createSocketConnection();
        socketRef.current.emit("joinChat", { firstName: user?.firstName, userId, targetUserId });

        socketRef.current.on("messageRecieved", ({ firstName, lastName, photoUrl, text }) => {
            console.log(firstName + " " + text);
            setMessages((messages) => [...messages, { firstName, lastName, photoUrl, text }]);
            chatEndRef?.current?.scrollIntoView({ behavior: "smooth" });
        })

        chatEndRef?.current?.scrollIntoView({ behavior: "smooth" });
        return () => {
            // Cleanup
            socketRef.current.disconnect();
        }
    }, [userId, targetUserId]);

    const handleSendMessage = () => {
        socketRef.current.emit("sendMessage", { firstName: user?.firstName, lastName: user?.lastName, photoUrl: user?.photoUrl, userId, targetUserId, text: userMsgInput });
        setUserMessageInput("");
    }

    return (
        <div className="w-3/4 h-[70vh] flex flex-col m-5 mx-auto border border-gray-600">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-y-auto p-5">
                {messages.map((msg, index) => {
                    return (
                        <>
                            <div key={index} className={"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="User"
                                            src={msg.photoUrl}
                                        />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    {msg.firstName + " " + msg.lastName}
                                    <time className="text-xs opacity-50">12:45</time>
                                </div>
                                <div className="chat-bubble">{msg.text}</div>
                                <div className="chat-footer opacity-50">Delivered</div>
                            </div>
                        </>
                    );
                })}
                     <div ref={chatEndRef} />
            </div>
       
            <div className="p-5 border-t border-gray-600 flex items-center gap-2 ">
                <input value={userMsgInput} className="flex-1 border border-gray-500 text-white rounded p-2" onChange={(e) => setUserMessageInput(e.target.value)} />
                <button className="btn btn-secondary" onClick={() => handleSendMessage()}>Send</button>
            </div>
                
        </div>);
}

export default Chat;