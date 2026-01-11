import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({user, disabled}) => {
    const dispatch = useDispatch();
    const handleSendRequest = async (status, userId) => {

        try {
            await axios.post(BASE_URL + "/request/send/"+status+"/"+userId, {}, {withCredentials: true});
            dispatch(removeFeed(userId))
        } catch(err) {
            console.log(err);
        }

    }

    const {_id, firstName, lastName, age, gender, about, photoUrl} = user;
    return (
        user && (<div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img className="w-full object-cover"
                    src={photoUrl}
                    alt="User" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
               { age && gender && <p className="justify-center">{age + " " + gender}</p>}
                <p className="justify-center">{about}</p>
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-primary" disabled={disabled} onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-secondary" disabled={disabled} onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>)
    )
}

export default UserCard;