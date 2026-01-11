import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store => store.requests);
    console.log(requests)
    const fetchRequests = async () => {
        try {
            const requestsResponse = await axios.get(BASE_URL + "/user/requests/recieved", { withCredentials: true });
            dispatch(addRequests(requestsResponse.data.data))
        } catch (err) {
            console.log("Error ::", err);
        }
    }

    const handleUserAction = async (status, requestId) => {
        try {
            await axios.post(BASE_URL + "/request/review/"+status+"/"+requestId, {}, {withCredentials: true});
            dispatch(removeRequest(requestId))
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);


    if (!requests) return;

    if (requests.length === 0) {
        return <h1 className="flex justify-center my-4">No requests found</h1>
    }

    return (
        <div className="flex flex-col items-center gap-5 my-10">
            <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

            {requests.map(request => {
                const { _id, firstName, lastName, photoUrl, about, age, gender } = request.fromUserId;

                return (
                    <div key={_id} className="flex gap-10 p-4 m-4 bg-base-300 items-center w-1/4">
                        <div>
                            <img alt="user" src={photoUrl} className="w-20 h-20 rounded-full" />
                        </div>
                        <div className="text-left">
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div className="flex gap-4">
                              <button className="btn btn-primary" onClick={() => handleUserAction("rejected", request._id)}>Reject</button>
                    <button className="btn btn-secondary" onClick={() => handleUserAction("accepted", request._id)}>Accept</button>
                        </div>

                    </div>
                )

            })}
        </div>
    )
}

export default Requests;