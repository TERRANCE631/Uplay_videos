import { useRef, useState } from "react";
import { GlobalContext } from "../../../Hooks/Context/useContext";
import { AxiosInstance } from "../../../Lib/AxiosInstance";
import { toast } from "react-toastify";

export const CreatePostFn = (setShowCreatePost) => {
    const { user, getVideos } = GlobalContext();
    const [post, setPost] = useState(false);
    const uploadVideo = useRef(null);
    const [upload, setUpload] = useState(null);

    const postVideo = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        formData.append("username", user.username);
        formData.append("photo", user.profile_image);
        formData.append("userID", user.id);

        if (upload) {
            try {
                setPost(true)
                await AxiosInstance.post(`/uplay/videos`, formData)
                    .then(() => {
                        getVideos()
                    });

            } catch (error) {
                console.log("Error occurred in postVideo function", + " | " + error);
            } finally {
                setPost(false)
                getVideos()
                setShowCreatePost(false)
            }
        } else {
            toast.warn("No upload found")
        }
    };

    return { post, user, uploadVideo, upload, setUpload, postVideo }
}
