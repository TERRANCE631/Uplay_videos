import axios from "axios";
import { useEffect, useRef, useState } from "react";

export function VideoPlayerFn(id) {
    const [videoDetails, setVideoDetails] = useState({});
    const [toggle, setToggle] = useState(true);
    const scrollRef = useRef(null);

    const getVideoByID = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/uplay/VideoPlayer/${id}`)
            .then(res => {
                const data = res.data;
                setVideoDetails(data);
            });
    };

    const { username, likes, downloads, clicks, photo, title } = videoDetails
    useEffect(() => {
        getVideoByID();
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
        toggle,
        setToggle
    };
}
