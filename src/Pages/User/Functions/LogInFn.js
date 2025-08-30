import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../Hooks/Context/useContext";
import { toast } from "react-toastify";

export function LogInFn(setLogin) {
    const [userToken, setToken] = useState(JSON.parse(sessionStorage.getItem("userToken")) || "");
    const [ID, setID] = useState(JSON.parse(localStorage.getItem("userID")) || 0);
    const { getUserDetails } = GlobalContext()
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [logingIn, setLoggingIn] = useState(false);

    const [userInputs, setUserInputs] = useState({
        username: "",
        password: ""
    });

    useEffect(() => {
        sessionStorage.setItem("userToken", JSON.stringify(userToken));
        sessionStorage.setItem("userID", JSON.stringify(ID));
        // eslint-disable-next-line
    }, [userToken]);

    setTimeout(() => {
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userID");
    }, 1000 * 60 * 60 * 24);

    const UserInputs = async (e) => {
        e.preventDefault();
        getUserDetails();
        const username = userInputs.username
        const password = userInputs.password

        try {
            setLoggingIn(true)
            await axios.post(`${process.env.REACT_APP_API_URL}/uplay/signIn`, { username, password })
                .then(res => {
                    const data = res.data;
                    setToken(data.token) 
                    setID(data.id);
                    toast.success(data.loggedIn);
                    userToken === undefined && toast.error(data.error);

                    if (data.token) {
                        setTimeout(() => {
                            navigate("/");
                            setLogin(false);
                        }, 1000);
                        e.target.reset();
                    };
                });
        } catch (error) {
            console.log("Error occured at 👉👉LogInFn function", + " | " + error)
            throw new Error(error);
        } finally {
            setLoggingIn(false)
        }
    };

    return { UserInputs, logingIn, setLoggingIn, setUserInputs, userInputs, showPassword, setShowPassword }
}
