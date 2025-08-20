import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";

const ContextWrapper = createContext(null);
export function GlobalState({ children }) {
    const userID = JSON.parse(sessionStorage.getItem("userID"));
    const token = JSON.parse(sessionStorage.getItem("userToken"));

    const [value, setValue] = useState("");
    const [subs, setSubs] = useState([]);
    const [showLogin, setLogin] = useState(false);
    const [Loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState({});

    const getUserDetails = async () => {
        try {
            await axios.get(`http://localhost:9000/uplay/GetUseId/${userID}`)
                .then(res => {
                    const data = res.data
                    setUser(data)
                });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    const getVideos = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/uplay/getVideos`)
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
            axios.get(`${process.env.REACT_APP_API_URL}/uplay/getSubs`)
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
        userID
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