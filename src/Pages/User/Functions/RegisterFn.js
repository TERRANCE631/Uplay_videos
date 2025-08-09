import axios from "axios";
import { useEffect, useState } from "react";

export function RegisterFn(setRegister, setLogin) {
    const [profile_image, setProfile_image] = useState(null);
    const [registered, setRegistered] = useState("");

    const [state, setState] = useState({
        usernameErr: "",
        registered: "",
        presentUsername: 0,
        existingUser: ""
    });

    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
    });
    const { username, email } = userDetails;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/uplay/getUsername`)
            .then(res => {
                const data = res.data;
                const filter = data.length > 0 && data.filter((item) => item.username.includes(userDetails.username));
                setState({ ...state, presentUsername: filter.length });
            });
        // eslint-disable-next-line
    }, [userDetails.username]);

    const UserInputs = (e) => {
        e.preventDefault();
        if (username && !username.match(/[A-Za-z0-9.@]/) && email && !email.match(/[A-Za-z0-9.@]/))
            return setState({ ...state, usernameErr: "Username / Email can only have A-Z a-z 0-9 . @ / latters and numbers." });

        if (state.presentUsername > 0) {
            setState({ ...state, existingUser: "Username already exist, try another username" })
        }

        const users = new FormData();

        users.append("username", userDetails.username);
        users.append("email", userDetails.email);
        users.append("password", userDetails.password);
        users.append("image", profile_image);

        try {
            if (!state.presentUsername > 0 || state.existingUser) {
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
            };
        } catch (error) {
            console.log(error);
        };
    };

    return {profile_image, setProfile_image, registered, setRegistered, state, setState, UserInputs, userDetails, setUserDetails}
}
