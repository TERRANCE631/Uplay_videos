import axios from 'axios';
import { useEffect, useState } from 'react'

export function LikesFn(id) {
    const userID = JSON.parse(sessionStorage.getItem("userID"));
    const [showDropDown, setShowDropDown] = useState(false);
    const [existOrNot, setExistOrNot] = useState(false);

    // likes and object of the current user
    const [like, setLike] = useState([]);
    const [user, setUser] = useState({});

    // filter likes from the database to get its length and render it as likes.
    // eslint-disable-next-line
    const likes = like.filter(item => item.videoID == id);

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

    const handleDelete = async (id) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/uplay/deletelike/${id}`)
    };

    // posting likes, username, videoID and id as primary key
    const Likes = () => {
        const formData = new FormData();

        formData.append("username", user.username);
        formData.append("userID", userID);
        formData.append("videoID", id);

        axios.post(`${process.env.REACT_APP_API_URL}/uplay/likes`, formData)
    };

    const getLikes = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/uplay/getLikes`)
            .then(res => {
                const data = res.data;
                setLike(data);
                console.log(data);
            })
    };

    useEffect(() => {
        getLikes()
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        // chicking if the current username exist in the database. If false like button is displayed
        // eslint-disable-next-line
        const test2 = like.findIndex(item => item.videoID == id && item.userID == userID && item.id == item.id);

        if (test2 !== -1) {
            setExistOrNot(true);
        } else {
            setExistOrNot(false);
        };
        // eslint-disable-next-line
    }, [like, user.username, id, getLikes]);

    return { showDropDown, setShowDropDown, existOrNot, setExistOrNot, user, like, likes, handleDelete, Likes, getLikes, userID }
}
