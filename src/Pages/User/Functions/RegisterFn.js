import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AxiosInstance } from "../../../Lib/AxiosInstance";
import { GlobalContext } from "../../../Hooks/Context/useContext";
import { useNavigate } from "react-router-dom";

export function RegisterFn(setRegister, setLogin) {
    const [profile_image, setProfile_image] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const { getUserDetails } = GlobalContext();
    const [triggerAnimation, setTriggerAnimation] = useState(false);
    const [buttonLoader, setbuttonLoader] = useState(false);
    const imageRef = useRef(null);
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [foundUser, setFoundUser] = useState({});
    const { username, email } = userDetails;

    useEffect(() => {
        AxiosInstance.get("/uplay/getUsername")
            .then(res => {
                const data = res.data;
                const filter = data.length > 0 && data.find((item) => item.username.includes(username || 0));
                setFoundUser(filter)
            });
        // eslint-disable-next-line
    }, [username]);

    const validation = () => {
        if (username && !username.match(/[A-Za-z0-9.@]/) && email && !email.match(/[A-Za-z0-9.@]/))
            return toast.error("Username / Email can only have A-Z a-z 0-9 . @ / latters and numbers.")

        if (!profile_image)
            return toast.error("Profile picture must be provided")

        if (foundUser) return toast.error("Username already exist, try another username")

        return true
    };

    const UserInputs = (e) => {
        e.preventDefault();
        const success = validation()
        const users = new FormData();
        if (!profile_image) { setTriggerAnimation(true) }

        users.append("username", userDetails.username);
        users.append("email", userDetails.email);
        users.append("password", userDetails.password);
        users.append("image", profile_image);
        
        try {
            setbuttonLoader(true)
            if (success === true) {
                AxiosInstance.post("/uplay/register", users)
                    .then(res => {
                        const data = res.data
                        toast.success(data.registered);
                        getUserDetails();
                        setTimeout(() => {
                            // setLogin(true);
                            setRegister(false);
                        }, 2000);
                        setUserDetails({ ...userDetails, username: "", email: "", password: "" });
                    })
                navigate("/");
                e.target.reset();
                getUserDetails();
            }
            getUserDetails();
        } catch (error) {
            console.log("Error occured in register funtion", + " | " + error);
        } finally {
            setbuttonLoader(false);
            getUserDetails();
        };
    };

    const stopAnimation = () => {
        setTriggerAnimation(false)
    }

    return { profile_image, stopAnimation, buttonLoader, triggerAnimation, imageRef, showPassword, setShowPassword, setProfile_image, UserInputs, userDetails, setUserDetails }
};
