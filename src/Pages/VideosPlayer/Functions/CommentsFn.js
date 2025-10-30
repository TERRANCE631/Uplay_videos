import { useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../../Hooks/Context/useContext";
import { ScrollIntoView } from "../../../Hooks/ScrollIntoView/ScrollIntoView";
import { AxiosInstance } from "../../../Lib/AxiosInstance";

export function CommentsFn(videoDetails) {
    const { user } = GlobalContext();
    const { scrollFunction } = ScrollIntoView()
    const [sendComment, setSendComment] = useState("")
    const [data, setData] = useState([]);
    const [forUseEffect, setForUseEffect] = useState("");
    const comments = data.length > 0 && data.filter(item => item.videoID === videoDetails.id);
    const scrollRef = useRef(null);
    const [sendingComment, setSendingComment] = useState(false);

    const sendFeedback = (e) => {
        e.preventDefault();

        const timeNdate = new Date();
        const currentDate = `${timeNdate.toDateString()} ${timeNdate.toLocaleTimeString()}`

        const videoID = videoDetails.id;
        const userID = user.id;
        const username = user.username;
        const profile_image = user.profile_image;
        const date = currentDate;
        const comment = sendComment;

        AxiosInstance.post("/uplay/postComments", { comment, videoID, userID, username, date, profile_image })
            .then(res => {
                const data = res.data;
                setForUseEffect(data.details);
            });
        e.target.reset();
    };

    const getComments = () => {
        setSendingComment(true);
        try {
            AxiosInstance.get("/uplay/getComments")
                .then(res => {
                    const data = res.data;
                    setData(data);
                });
        } catch (error) {
            console.log("Error fetching comments", + " | " + error.message);
        } finally {
            setSendingComment(false);
        }
    };

    useEffect(() => {
        getComments();
    }, [forUseEffect]);

    return { scrollFunction, sendingComment, sendFeedback, comments, data, scrollRef, sendComment, setSendComment }
};
