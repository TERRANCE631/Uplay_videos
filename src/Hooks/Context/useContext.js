import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"

const ContextWrapper = createContext(null);
export function GlobalState({ children }) {
    const userID = JSON.parse(sessionStorage.getItem("userID"));

    const [value, setValue] = useState("");
    const [subs, setSubs] = useState([]);
    const [showLogin, setLogin] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState({});

    const getUserDetails = async () => {
        await axios.get(`http://localhost:9000/uplay/GetUseId/${userID}`)
            .then(res => {
                const data = res.data
                setUser(data)
                console.log(data);
            });
    };

    const getVideos = async () => {
        try {
            setLoading(true)
            await axios.get(`${process.env.REACT_APP_API_URL}/uplay/getVideos`)
                .then(res => {
                    const data = res.data;
                    setLoading(false)
                    setVideos(data);
                    console.log(data);
                })
        } catch (error) {
            console.log(error);
        }
    };

    const GetSubscribers = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/uplay/getSubs`)
            .then(res => {
                const data = res.data;
                setSubs(data);
            })
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
        getUserDetails
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
}