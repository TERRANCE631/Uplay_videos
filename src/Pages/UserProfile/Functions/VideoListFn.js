import axios from "axios";
import { useState } from "react";

export function VideoListFn(videoList) {
    const [ID, setID] = useState(null);
    const [toggle, setToggle] = useState(false);
    const userID = JSON.parse(sessionStorage.getItem("userID"));

    const deleteVideo = (id) => {
        axios.delete(`http://localhost:9000/uplay/deleteVideo/${id}`);
        videoList.filter((item) => item.id !== id);
    };

    return { ID, setID, toggle, setToggle, userID, deleteVideo }
}
