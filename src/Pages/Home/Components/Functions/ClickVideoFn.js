import axios from "axios";
import { GlobalContext } from "../../../../Hooks/Context/useContext";
import { useEffect, useState } from "react";

export function ClickVideoFn() {
    const userID = JSON.parse(sessionStorage.getItem("userID"));
    const { Loading, videos, getVideos } = GlobalContext();
    const [user, setUser] = useState({});

    const Rtext = "<Upl"
    const Ltext = "ay />"

    const getUserDetails = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/uplay/GetUseId/${userID}`)
            .then(res => {
                const data = res.data
                setUser(data)
                console.log(data);
            });
    };

    useEffect(() => {
        getUserDetails()
        // eslint-disable-next-line
    }, [userID])

    useEffect(() => {
        getVideos();
        // eslint-disable-next-line
    }, []);

    const reloadPage = () => {
        window.location.reload();
    }

    return { Ltext, reloadPage, Rtext, Loading, videos, getVideos, user }
}
