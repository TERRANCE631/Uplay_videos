import axios from "axios";
import { useState } from "react";
import { GlobalContext } from "../../../Hooks/Context/useContext";

export function VideoListFn(videos, getVideos) {
    const [videoDetails, setVideoDetails] = useState({
        id: null,
        title: ""
    });
    const [toggle, setToggle] = useState(false);
    const { userID } = GlobalContext();
    const deleteVideo = (id) => {
        try {
            axios.delete(`http://localhost:9000/uplay/deleteVideo/${id}`);
            videos.filter((item) => item.id !== id);
        } catch (error) {
            console.log("Error occured in 👉👉VideoListFn", + " | " + error);
        } finally {
            getVideos();
        }
    };

    return { videoDetails, setVideoDetails, toggle, setToggle, userID, deleteVideo }
}
