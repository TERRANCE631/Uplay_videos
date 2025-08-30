import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export function RegisterFn(setRegister, setLogin) {
    const [profile_image, setProfile_image] = useState(null);
    const [registered, setRegistered] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const imageRef = useRef(null);

    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [foundUser, setFoundUser] = useState({});
    const { username, email, password } = userDetails;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/uplay/getUsername`)
            .then(res => {
                const data = res.data;
                const filter = data.length > 0 && data.filter((item) => item.username.includes(username));
                setFoundUser(filter)
            });
        // eslint-disable-next-line
    }, [username]);

    const validation = () => {
        if (username && !username.match(/[A-Za-z0-9.@]/) && email && !email.match(/[A-Za-z0-9.@]/))
            return toast.error("Username / Email can only have A-Z a-z 0-9 . @ / latters and numbers.")

        if (username && !username)
            return toast.error("Username / Email must be provided")

        if (email && !email)
            return toast.error("Username / Email must be provided")

        if (password && !password)
            return toast.error("Password must be provided")

        if (foundUser) return toast.error("Username already exist, try another username")

        if (profile_image === null) return toast.error("Profile picture must be provided")

        return true
    }

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
                axios.post(`${process.env.REACT_APP_API_URL}/uplay/register`, users)
                    .then(res => {
                        const data = res.data
                        setRegistered(data.registered);
                        setTimeout(() => {
                            setLogin(true);
                            setRegister(false);
                        }, 2000);
                        setTimeout(() => {
                            setRegistered("");
                        }, 2000);
                        setUserDetails({ ...userDetails, username: "", email: "", password: "" });
                    })
                    .catch(error => console.log(error));
            }
        } catch (error) {
            console.log("Error occured in register funtion", + " | " + error);
        };
    };

    return { profile_image, imageRef, showPassword, setShowPassword, setProfile_image, registered, setRegistered, UserInputs, userDetails, setUserDetails }
}
