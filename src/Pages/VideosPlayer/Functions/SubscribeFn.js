import { useEffect, useState } from 'react'
import { AxiosInstance } from '../../../Lib/AxiosInstance';
import { GlobalContext } from '../../../Hooks/Context/useContext';

export function SubscribeFn(id, userID, subs, GetSubscribers, videoDetails, username, user, photo) {
    const [exist, setExist] = useState(false);
    const { loadingSubs } = GlobalContext();

    const Subscribers = () => {
        const formData = new FormData();

        formData.append("username", user.username)
        formData.append("videoUserID", videoDetails.userID)
        formData.append("videoID", id)
        formData.append("userID", userID)
        formData.append("profile_photo", photo);
        formData.append("sub__To", username);

        AxiosInstance.post(`/uplay/postSubs`, formData)
    };

    const DeleteSub = async (userID) => {
        await AxiosInstance.delete(`/uplay/deleteSub/${userID}`);
    };

    useEffect(() => {
        GetSubscribers()
        // eslint-disable-next-line
    }, [user, id]);

    const amountOfSubs = subs.length > 0 && subs.filter(item => item.videoUserID === videoDetails.userID);

    useEffect(() => {
        // eslint-disable-next-line 
        const existOrNot = subs.length > 0 && subs.findIndex(item => item.videoUserID === videoDetails.userID && item.userID === userID);

        if (subs.length > 0 && existOrNot !== -1) {
            setExist(true);
        } else {
            setExist(false);
        }
    }, [id, subs, GetSubscribers, videoDetails.userID, userID]);

    return { exist, loadingSubs, setExist, Subscribers, DeleteSub, amountOfSubs }
};
