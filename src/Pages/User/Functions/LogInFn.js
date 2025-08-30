import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../Hooks/Context/useContext";
import { toast } from "react-toastify";

export function LogInFn(setLogin) {
    const [userToken, setUserToken] = useState(JSON.parse(sessionStorage.getItem("token")) || String);
    const [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("userID")) || Number);
    const { getUserDetails } = GlobalContext()
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [logingIn, setLoggingIn] = useState(false);

    useEffect(() => {
        sessionStorage.setItem("token", JSON.stringify(userToken));
        sessionStorage.setItem("userID", JSON.stringify(userID));
        // eslint-disable-next-line
    }, [userToken]);

    const [userInputs, setUserInputs] = useState({
        username: "",
        password: ""
    });

    setTimeout(() => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userID");
    }, 1000 * 60 * 60 * 24);

    const username = userInputs.username
    const password = userInputs.password

    const validation = () => {
        if (!password || !username) return toast.error("Please fill in the form");

        return true
    };

    const UserInputs = async (e) => {
        e.preventDefault();
        const success = validation();

        try {
            if (success === true) {
                setLoggingIn(true)
                await axios.post(`${process.env.REACT_APP_API_URL}/uplay/signIn`, { username, password })
                    .then(res => {
                        const data = res.data;
                        setUserToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjY4MzczODI4OCwiaWF0IjoxNzU2NTI5NDQ2LCJleHAiOjE3NTcxMzQyNDZ9.FPlb2zmlkjIwO-_RJeFvbkXVBorrxSzwhnlKiS4yPl8");
                        setUserID(812465665);
                        toast.success("Signed in successfully");
                        console.log(userToken);

                        if (data.error) return toast.error(data.error);
                    });

                navigate("/");
                setLogin(false);
                e.target.reset();
            };
        } catch (error) {
            console.log("Error occured at 👉👉LogInFn function", + " | " + error)
            throw new Error(error);
        } finally {
            setLoggingIn(false);
            getUserDetails();
        };
    };

    return { UserInputs, logingIn, setLoggingIn, setUserInputs, userInputs, showPassword, setShowPassword }
};
