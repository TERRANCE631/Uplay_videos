import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../../Hooks/Context/useContext";

export function VideoPlayerFn(id) {
    const [videoDetails, setVideoDetails] = useState({});
    const [toggle, setToggle] = useState(true);
    const scrollRef = useRef(null);
    const { getVideos, videos } = GlobalContext()

    const getVideoByID = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/uplay/VideoPlayer/${id}`)
            .then(res => {
                const data = res.data;
                setVideoDetails(data);
            });
    };

    const { username, likes, downloads, clicks, photo, title, video } = videoDetails
    useEffect(() => {
        getVideoByID();
        getVideos();
        // eslint-disable-next-line 
    }, [id]);

    return {
        videoDetails,
        scrollRef,
        username,
        likes,
        downloads,
        clicks,
        photo,
        title,
        video,
        toggle,
        videos,
        setToggle
    };
};
