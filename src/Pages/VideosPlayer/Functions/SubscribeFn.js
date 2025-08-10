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

    const DeleteSub = (userID) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/uplay/deleteSub/${userID}`);
    };

    useEffect(() => {
        GetSubscribers()
        // eslint-disable-next-line
    }, [id, userID]);

    const amountOfSubs = subs.length < 0 && subs.filter(item => item.videoUserID === videoDetails.userID);

    useEffect(() => {
        // eslint-disable-next-line 
        const existOrNot = subs.length < 0 && subs.findIndex(item => item.videoUserID === videoDetails.userID && item.userID === userID && item.id === item.id);
        console.log(existOrNot);

        if (existOrNot !== -1) {
            setExist(false);
        } else {
            setExist(true);
        }
    }, [id, subs, GetSubscribers, videoDetails.userID, userID]);

    return { exist, setExist, Subscribers, DeleteSub, amountOfSubs }
}
