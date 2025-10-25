import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../Hooks/Context/useContext";
import { toast } from "react-toastify";
import { AxiosInstance } from "../../../Lib/AxiosInstance";

export function LogInFn(setLogin) {
    const { getUserDetails } = GlobalContext()
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [buttonLoader, setbuttonLoader] = useState(false);

    const [userInputs, setUserInputs] = useState({
        username: "",
        password: ""
    });

    const username = userInputs.username
    const password = userInputs.password

    const validation = () => {
        if (!password || !username) return toast.error("Fill in the form");

        return true
    };

    const UserInputs = async (e) => {
        e.preventDefault();
        const success = validation();

        try {
            if (success === true) {
                await AxiosInstance.post("/uplay/signIn", { username, password })
                    .then((res) => {
                        const data = res.data

                        if (data.user) {
                            navigate("/");
                            setLogin(false);
                            e.target.reset();
                            toast.success("Signed in successfully")
                        } else {
                            toast.error(data.message)
                        }
                    });
            };
        } catch (error) {
            toast.error(error.message);
            console.log("Error occured at 👉👉LogInFn function", + " | " + error)
            throw new Error(error);
        } finally {
            setbuttonLoader(false);
            getUserDetails();
        };
    };

    return { UserInputs, buttonLoader, setbuttonLoader, setUserInputs, userInputs, showPassword, setShowPassword }
};
