import { createContext, useContext, useEffect, useState } from "react"
import { AxiosInstance } from "../../Lib/AxiosInstance";

const ContextWrapper = createContext(null);
export function GlobalState({ children }) {
    const [value, setValue] = useState("");
    const [subs, setSubs] = useState([]);
    const [showLogin, setLogin] = useState(false);
    const [showRegister, setRegister] = useState(false);
    const [Loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState({});
    const [loadingVideos, setLoadingVideos] = useState(true)
    const userId = user && user.id
    const userID = user && user.id

    const [index, setIndex] = useState(JSON.parse(sessionStorage.getItem("videoIndex")) || 0)

    const getVideos = async () => {
        try {
            await AxiosInstance.get("/uplay/getVideos")
                .then(res => {
                    const data = res.data;
                    setVideos(data);
                    setLoadingVideos(false)
                })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        sessionStorage.setItem("videoIndex", JSON.stringify(index))
    }, [index, Loading])

    const getUserDetails = async () => {
        try {
            await AxiosInstance.get("/uplay/checkAuth")
                .then(res => {
                    const data = res.data
                    setUser(data)
                });
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false)
        };
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

    const getIndex = (index) => {
        setIndex(index)
    };

    const getHomeVideoIndex = (index) => {
        setIndex(index)
    };

    useEffect(() => { GetSubscribers() }, [user]);

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
        setProfile,
        getIndex,
        index,
        getHomeVideoIndex,
        loadingVideos,
        setLoadingVideos,
        showRegister,
        setRegister
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