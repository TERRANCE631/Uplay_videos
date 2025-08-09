import { useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../../Hooks/Context/useContext";
import axios from "axios";

export function CommentsFn(videoDetails) {
    const userID = JSON.parse(sessionStorage.getItem("userID"));
    const { scrollIntoView } = GlobalContext();

    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [forUseEffect, setForUseEffect] = useState("");

    const comments = data && data.filter(item => item.videoID === videoDetails.id);
    const scrollRef = useRef(null);

    // getting current user details
    const getUserDetails = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/uplay/GetUseId/${userID}`)
            .then(res => {
                const data = res.data
                setUser(data)
            });
    };

    useEffect(() => {
        getUserDetails()
        // eslint-disable-next-line
    }, [userID])
    // end of getting current user datails

    const sendFeedback = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const timeNdate = new Date();
        const date = `${timeNdate.toDateString()} ${timeNdate.toLocaleDateString()}`

        formData.append("videoID", videoDetails.id);
        formData.append("userID", videoDetails.userID);
        formData.append("username", user.username);
        formData.append("date", date);

        axios.post(`${process.env.REACT_APP_API_URL}/uplay/postComments`, formData)
            .then(res => {
                const data = res.data;
                setForUseEffect(data.details);
            });
        e.target.reset();
    };

    const getComments = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/uplay/getComments`)
            .then(res => {
                const data = res.data;
                console.log(data);
                setData(data);

            });
    }

    useEffect(() => {
        getComments();
    }, [forUseEffect]);

    return { scrollIntoView, sendFeedback, comments, data, scrollRef }
}
