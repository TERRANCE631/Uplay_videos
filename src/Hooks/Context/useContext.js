import axios from "axios";
import { createContext, useContext, useState } from "react"
import { AxiosInstance } from "../../Lib/AxiosInstance";

const ContextWrapper = createContext(null);
export function GlobalState({ children }) {
    const [value, setValue] = useState("");
    const [subs, setSubs] = useState([]);
    const [showLogin, setLogin] = useState(false);
    const [Loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState({});

    const userId = user && user.id
    const userID = user && user.id

    const getUserDetails = async () => {
        try {
            await AxiosInstance.get("/uplay/checkAuth")
                .then(res => {
                    const data = res.data
                    setUser(data ? data : null)
                });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        };
    };

    const getVideos = async () => {
        try {
            await AxiosInstance.get("/uplay/getVideos")
                .then(res => {
                    const data = res.data;
                    setVideos(data);
                })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    const GetSubscribers = () => {
        try {
            AxiosInstance.get("/uplay/getSubs")
                .then(res => {
                    const data = res.data;
                    setSubs(data);
                })
        } catch (error) {
            console.log(error);
        }
    };

    const scrollIntoView = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth" })
    };

    const values = {
        value,
        setValue,
        GetSubscribers,
        subs,
        setSubs,
        scrollIntoView,
        showLogin,
        setLogin,
        Loading,
        setLoading,
        getVideos,
        videos,
        setVideos,
        user,
        getUserDetails,
        userID,
        setUser,
        userId,
        profile,
        setProfile
    };

    return (
        <ContextWrapper.Provider value={values}>
            {children}
        </ContextWrapper.Provider>
    )
};

export const GlobalContext = () => {
    const context = useContext(ContextWrapper);
    return context;
};