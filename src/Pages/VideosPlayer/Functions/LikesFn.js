import axios from 'axios';
import { useEffect, useState } from 'react'
import { GlobalContext } from '../../../Hooks/Context/useContext';
import { AxiosInstance } from '../../../Lib/AxiosInstance';

export function LikesFn(id) {
    // const userId = JSON.parse(sessionStorage.getItem("userID"));
    const [showDropDown, setShowDropDown] = useState(false);
    const [existOrNot, setExistOrNot] = useState(false);
    const { user, getUserDetails, userId } = GlobalContext();
    const [like, setLike] = useState([]);

    // filter likes from the database to get its length and render it as likes.
    // eslint-disable-next-line
    const likes = like.length > 0 && like.filter((item) => item.videoID == id);
    console.log(likes);

    const handleDelete = async (id) => {
        await AxiosInstance.delete(`/uplay/deletelike/${id}`)
    };

    // posting likes, username, videoID and id as primary key
    const Likes = () => {
        const username = user.username
        const userID = userId
        const videoID = id

        AxiosInstance.post(`/uplay/likes`, { username, userID, videoID })
    };

    const getLikes = async () => {
        await AxiosInstance.get(`/uplay/getLikes`)
            .then(res => {
                const data = res.data;
                setLike(data);
                console.log(data);
            })
    };

    useEffect(() => {
        getLikes()
        getUserDetails()

        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        // chicking if the current username exist in the database. If false like button is displayed
        // eslint-disable-next-line
        const test2 = like.length > 0 && like.findIndex((item) => item.videoID == id && item.userID === userId);

        if (like.length > 0 && test2 !== -1) {
            setExistOrNot(true);
        } else {
            setExistOrNot(false);
        };
        // eslint-disable-next-line
    }, [like, user && user.username, id, getLikes]);

    return { showDropDown, setShowDropDown, existOrNot, setExistOrNot, user, like, likes, handleDelete, Likes, getLikes, userId }
}
