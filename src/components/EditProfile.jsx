import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLasttName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about);
    const [gender, setGender] = useState(user.firstName);

    const [error, setError] = useState("");
    const [showToast, setToast] = useState("");

    const saveProfile = async () => {
        try {
            const updateResponse = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, age, gender, photoUrl, about }, { withCredentials: true });
            console.log("use r resp ::", updateResponse);
            setError("");
            setToast(true);

            setTimeout(() => {
                setToast(false);
            }, 3000);
            dispatch(addUser(updateResponse.data.data));
        } catch (err) {
            setError(err?.response?.data);
        }
    }

    return (
        <div className="flex justify-center items-center my-10 gap-10">
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>
                    <div className="my-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input type="text" className="input" value={lastName} onChange={(e) => setLasttName(e.target.value)} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Age</legend>
                            <input type="text" className="input" value={age} onChange={(e) => setAge(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Gender</legend>
                            <input type="text" className="input" value={gender} onChange={(e) => setGender(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Photo Url</legend>
                            <input type="text" className="input" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                        </fieldset>


                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">About</legend>
                            <input type="text" className="input" value={about} onChange={(e) => setAbout(e.target.value)} />
                        </fieldset>
                    </div>
                    <p class="text-red-500">{error}</p>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }} />
            ({showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>})
        </div>

    )
}

export default EditProfile;