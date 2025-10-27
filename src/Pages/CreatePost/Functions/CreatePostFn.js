import { useRef, useState } from "react";
import { GlobalContext } from "../../../Hooks/Context/useContext";
import { AxiosInstance } from "../../../Lib/AxiosInstance";
import { toast } from "react-toastify";

export const CreatePostFn = (setShowCreatePost) => {
    const { user, getVideos } = GlobalContext();
    const [post, setPost] = useState(false);
    const uploadVideo = useRef(null);
    const [upload, setUpload] = useState(null);

    const [progress, setProgress] = useState(0);
    const [uploadedMB, setUploadedMB] = useState(0);
    const [totalMB, setTotalMB] = useState(0);

    const postVideo = async (e) => {
        e.preventDefault();

        // ✅ 1. Check for a selected file first
        if (!upload) {
            toast.warn("No video selected for upload");
            return;
        }

        // ✅ 2. Reset upload tracking values
        setProgress(0);
        setUploadedMB(0);
        setTotalMB((upload.size / (1024 * 1024)).toFixed(2));

        const category = e.target.category.value;
        const title = e.target.title.value;

        // ✅ 3. Prepare form data
        const formData = new FormData();
        formData.append("username", user.username);
        formData.append("photo", user.profile_image);
        formData.append("userID", user.id);
        formData.append("video", upload);
        formData.append("category", category);
        formData.append("title", title);

        try {
            setPost(true);

            // ✅ 4. Upload file with progress tracking
            await AxiosInstance.post(`/uplay/videos`, formData, {
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    const percent = Math.round((loaded * 100) / total);
                    const uploaded = (loaded / (1024 * 1024)).toFixed(2);
                    setProgress(percent);
                    setUploadedMB(uploaded);
                },
            });

            // ✅ 5. On success
            getVideos();
            toast.success("Video uploaded successfully");
        } catch (error) {
            console.error("Error occurred in postVideo function:", error);
            toast.error("Upload failed. Please try again.");
        } finally {
            // ✅ 6. Cleanup
            setPost(false);
            getVideos();
            setShowCreatePost(false);
            setUpload(null);
            if (uploadVideo.current) uploadVideo.current.value = ""; // reset file input
        }
    };

    return {
        post,
        user,
        uploadVideo,
        upload,
        setUpload,
        postVideo,
        progress,
        uploadedMB,
        totalMB,
    };
};
