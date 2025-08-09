import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"

const ContextWrapper = createContext(null);
export function GlobalState({ children }) {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    const userID = JSON.parse(sessionStorage.getItem("userID"));

    const [profileDetails, setProfileDetails] = useState()
    const [value, setValue] = useState("");
    const [subs, setSubs] = useState([]);
    const [showLogin, setLogin] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);

    const getVideos = async () => {
        try {
            setLoading(true)
            await axios.get(`${process.env.REACT_APP_API_URL}/uplay/getVideos`)
                .then(res => {
                    const data = res.data;
                    setLoading(false)
                    setVideos(data);
                })
        } catch (error) {
            console.log(error);
        }
    };

    function getUser() {
        axios.get(`${process.env.REACT_APP_API_URL}/uplay/GetUseId/${userID}`, {
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        })
            .then(res => {
                const data = res.data
                setProfileDetails(data.profile_Image)
            })
    };

    // useEffect(() => {
    //     getUser();
    //     // eslint-disable-next-line
    // }, [token, userID]);

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
        profileDetails,
        getUser,
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
        setVideos
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