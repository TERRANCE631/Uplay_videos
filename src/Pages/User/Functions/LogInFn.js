import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../Hooks/Context/useContext";

export function LogInFn(setLogin) {
    const [userToken, setToken] = useState(JSON.parse(sessionStorage.getItem("userToken")) || "");
    const [ID, setID] = useState(JSON.parse(localStorage.getItem("userID")) || 0);
    const { getUser } = GlobalContext()
    const navigate = useNavigate()

    const [err, setErr] = useState({
        error: "",
        loggedIn: "",
    });

    useEffect(() => {
        sessionStorage.setItem("userToken", JSON.stringify(userToken));
        sessionStorage.setItem("userID", JSON.stringify(ID));
        // eslint-disable-next-line
    }, [userToken]);

    const UserInputs = (e) => {
        e.preventDefault();
        getUser();
        const formData = new FormData(e.target);

        try {
            axios.post(`${process.env.REACT_APP_API_URL}/uplay/signIn`, formData)
                .then(res => {
                    const data = res.data;
                    setErr({ ...err, loggedIn: data.loggedIn })
                    data.token === undefined
                        ? setErr({ ...err, error: data.error })
                        : setToken(data.token) || setID(data.id);
                    if (data.token) {
                        setTimeout(() => {
                            setErr({ ...err, loggedIn: "", error: "" });
                            navigate("/");
                            setLogin(false);
                            // window.location.reload();
                        }, 1000);
                        setTimeout(() => {
                            sessionStorage.removeItem("userToken");
                            sessionStorage.removeItem("userID");
                        }, 1000 * 60 * 60 * 24);
                        e.target.reset();
                    };
                });
        } catch (error) {
            throw new Error(error);
        };
    };

    return { UserInputs, err }
}
