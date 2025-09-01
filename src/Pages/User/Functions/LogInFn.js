import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../Hooks/Context/useContext";
import { toast } from "react-toastify";
import { AxiosInstance } from "../../../Lib/AxiosInstance";

export function LogInFn(setLogin) {
    const { getUserDetails } = GlobalContext()
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [logingIn, setLoggingIn] = useState(false);

    const [userInputs, setUserInputs] = useState({
        username: "",
        password: ""
    });

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
                await AxiosInstance.post("/uplay/signIn", { username, password })

                toast.success("Signed in successfully")
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
