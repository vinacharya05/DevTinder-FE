import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useEffect } from "react";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store.connections);
    const fetchConnections = async () => {
        try {
            const connectionResponse = await axios.get(BASE_URL + "/user/connections", {withCredentials: true});
            dispatch(addConnections(connectionResponse.data))
        } catch(err) {
            console.log("Error ::", err);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);


    if (!connections) return;

    if (connections.length === 0) {
       return <h1>No Connections found</h1>
    }

    return (
        <div className="flex flex-col items-center gap-5 my-10">
            <h1 className="text-bold text-white text-3xl">Connections</h1>

             {connections.map(connection => {
                const {firstName, lastName, photoUrl, about, age, gender} = connection;

                return (
                    <div className="flex gap-10 p-4 m-4 bg-base-300 items-center w-1/2">
                        <div>
                            <img alt="user" src={photoUrl} className="w-20 h-20 rounded-full"/>
                        </div>
                         <div className="text-left">
                           <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                           {age && gender && <p>{age + ", " + gender}</p>}
                           <p>{about}</p>
                        </div>
                    </div>
                )

        })}
        </div>

       
    )
}

export default Connections;