import axios from "axios";
import { useState } from "react";

export function VideoListFn(videos, getVideos) {
    const [ID, setID] = useState(null);
    const [toggle, setToggle] = useState(false);
    const userID = JSON.parse(sessionStorage.getItem("userID"));

    const deleteVideo = (id) => {
        axios.delete(`http://localhost:9000/uplay/deleteVideo/${id}`);
        videos.filter((item) => item.id !== id);
        getVideos();
    };

    return { ID, setID, toggle, setToggle, userID, deleteVideo }
}
