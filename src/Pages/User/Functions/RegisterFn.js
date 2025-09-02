import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AxiosInstance } from "../../../Lib/AxiosInstance";
import { GlobalContext } from "../../../Hooks/Context/useContext";

export function RegisterFn(setRegister, setLogin) {
    const [profile_image, setProfile_image] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [signingUp, setSigningUp] = useState();
    const { getUserDetails } = GlobalContext()
    const imageRef = useRef(null);

    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [foundUser, setFoundUser] = useState({});
    const { username, email, password } = userDetails;

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

        if (!username || !email || !password || !profile_image)
            return toast.error("User details must be provided")

        if (foundUser) return toast.error("Username already exist, try another username")

        return true
    };

    const UserInputs = (e) => {
        e.preventDefault();
        const success = validation()
        const users = new FormData();

        users.append("username", userDetails.username);
        users.append("email", userDetails.email);
        users.append("password", userDetails.password);
        users.append("image", profile_image);

        try {
            if (success === true) {
                AxiosInstance.post("/uplay/register", users)
                    .then(res => {
                        const data = res.data
                        toast.success(data.registered);
                        setTimeout(() => {
                            // setLogin(true);
                            setRegister(false);
                        }, 1000);
                        setUserDetails({ ...userDetails, username: "", email: "", password: "" });
                    })
                    .catch(error => console.log(error));
            }
        } catch (error) {
            console.log("Error occured in register funtion", + " | " + error);
        } finally {
            setSigningUp(false)
            getUserDetails()
        }
    };

    return { profile_image, signingUp, imageRef, showPassword, setShowPassword, setProfile_image, UserInputs, userDetails, setUserDetails }
};
