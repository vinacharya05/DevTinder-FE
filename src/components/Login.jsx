import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("male");
    const [error, setError] = useState("");
    const [isLoginForm, setLoginForm] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const loggedInUser = await axios.post(BASE_URL + "/login", {
                emailId,
                password
            }, { withCredentials: true });

            dispatch(addUser(loggedInUser?.data?.data));
            return navigate("/");
        } catch (err) {
            setError(err?.response?.data || 'Something went wrong');
            console.log(err);
        }
    }

    const handleSignUp = async () => {
        try {
            const loggedInUser = await axios.post(BASE_URL + "/signup", {
                firstName, lastName, emailId, password, gender
            }, { withCredentials: true });

            dispatch(addUser(loggedInUser?.data?.data));
            return navigate("/profile");
        } catch (err) {
            setError(err?.response?.data || 'Something went wrong');
            console.log(err);
        }
    }

    return (
        <div className="flex justify-center my-10">
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? 'Login' : 'Sign Up'}</h2>
                    <div>
                        {!isLoginForm && <><fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name</legend>
                                <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender</legend>
                                <select value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="select">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>
                            </fieldset>
                        </>
                        }
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input type="text" className="input" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                        </fieldset>


                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                    </div>
                    <p class="text-red-500">{error}</p>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? 'Login' : 'Sign Up'}</button>
                    </div>
                    <p className="m-auto cursor-pointer py-2" onClick={() => setLoginForm(value => !value)}>{isLoginForm ? 'New User? Signup Here' : 'Existing User? Login Here'}</p>
                </div>
            </div>
        </div>
    )
}

export default Login;