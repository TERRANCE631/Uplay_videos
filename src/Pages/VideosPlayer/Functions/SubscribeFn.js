import axios from 'axios';
import { useEffect, useState } from 'react'

export function SubscribeFn(id, userID, subs, GetSubscribers, videoDetails, username, user, photo) {
    const [exist, setExist] = useState(false);

    const Subscribers = () => {
        const formData = new FormData();

        formData.append("username", user.username)
        formData.append("videoUserID", videoDetails.userID)
        formData.append("videoID", id)
        formData.append("userID", userID)
        formData.append("profile_photo", photo);
        formData.append("sub__To", username);

        axios.post(`${process.env.REACT_APP_API_URL}/uplay/postSubs`, formData)
            .then(res => {
                const data = res.data;
                console.log(data);
            })
    };

    const DeleteSub = async (userID) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/uplay/deleteSub/${userID}`);
    };

    const amountOfSubs = subs.length > 0 && subs.filter(item => item.videoUserID === videoDetails.userID);

    useEffect(() => {
        // eslint-disable-next-line 
        const existOrNot = subs.length > 0 && subs.findIndex(item => item.videoUserID === videoDetails.userID && item.userID === userID);
        console.log(existOrNot);

        if (subs.length > 0 && existOrNot !== -1) {
            setExist(true);
        } else {
            setExist(false);
        }
    }, [id, subs, GetSubscribers, videoDetails.userID, userID]);

    return { exist, setExist, Subscribers, DeleteSub, amountOfSubs }
};
