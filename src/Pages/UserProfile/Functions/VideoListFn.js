import { useState } from "react";
import { GlobalContext } from "../../../Hooks/Context/useContext";
import { AxiosInstance } from "../../../Lib/AxiosInstance";

export function VideoListFn(videos, getVideos) {
    const [videoDetails, setVideoDetails] = useState({
        id: null,
        title: ""
    });
    const [toggle, setToggle] = useState(false);
    const { userID } = GlobalContext();
    const deleteVideo = (id) => {
        try {
            AxiosInstance.delete(`/uplay/deleteVideo/${id}`);
            videos.filter((item) => item.id !== id);
        } catch (error) {
            console.log("Error occured in 👉👉VideoListFn", + " | " + error);
        } finally {
            getVideos();
        }
    };

    return { videoDetails, setVideoDetails, toggle, setToggle, userID, deleteVideo }
}
