import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const userFeed = useSelector((store) => store.feed);

    const fetchFeed = async () => {
        try {
            const feedResponse = await axios.get(BASE_URL + '/feed', { withCredentials: true });
            dispatch(addFeed(feedResponse.data))

        } catch (err) {
            // Handle error
            console.log(err)
        } 
    }

    useEffect(() => {
        if (!userFeed) {
            fetchFeed();
        }
    }, [userFeed]);

    if (!userFeed || userFeed.length === 0) {
        return <h1 className="flex justify-center my-10">No feed available</h1>
    }

    return (userFeed && (
        <div className="flex justify-center my-4">
            <UserCard user={userFeed[0]} />
        </div>
    )
    )
};

export default Feed;