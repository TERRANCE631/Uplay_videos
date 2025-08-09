import axios from "axios";
import { useEffect, useRef, useState } from "react";

export function VideoPlayerFn(id) {
    const [videoDetails, setVideoDetails] = useState({});
    const [videoList, setVideoList] = useState([]);
    const [toggle, setToggle] = useState(true);
    const scrollRef = useRef(null);


    const getVideoByID = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/uplay/VideoPlayer/${id}`)
            .then(res => {
                const data = res.data;
                setVideoDetails(data);
            });
    };

    const getVideos = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/uplay/getVideos`)
            .then(res => {
                const data = res.data;
                setVideoList(data);
            });
    };

    const { username, video, likes, downloads, clicks, photo, title } = videoDetails
    useEffect(() => {
        getVideos();
        getVideoByID();
        // eslint-disable-next-line 
    }, [id]);


    return {
        videoDetails,
        scrollRef,
        videoList,
        getVideos,
        username,
        video,
        likes,
        downloads,
        clicks,
        photo,
        title,
        toggle,
        setToggle
    };
}
