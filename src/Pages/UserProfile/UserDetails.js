import axios from "axios"
import { dashboardList } from "./Components/Dashboard"
import { UserInfor } from "./Components/UserInfor"
import { useEffect, useState } from "react"
import { TabList } from "./Components/TabList"
import { useParams } from "react-router-dom"

export function UserDetails() {
    const [user, setUser] = useState({});
    const [videoList, setVideoList] = useState([]);
    const { id } = useParams();
    
    // getting current user details
    const getUsersById = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/uplay/userprofile/${id}`)
            .then(res => {
                const data = res.data
                setUser(data)
            });
    };

    useEffect(() => {
        getUsersById()
        // eslint-disable-next-line
    }, [user.id, id])
    // end of getting current user datails

    const getVideos = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/uplay/getVideos`)
            .then(res => {
                const data = res.data;
                setVideoList(data);
            });
    };

    useEffect(() => {
        getVideos();
        // eslint-disable-next-line 
    }, []);

    const videoLenght = videoList.filter((prev) => prev.userID === user.id);
    return (
        <section className="">
            <div className="min-h-full">
                <div className="">
                    <div className="">
                        <UserInfor user={user} videoLenght={videoLenght} />
                    </div>
                    <div className="md:pt-[6rem] pt-[4rem]">
                        <TabList videoList={videoList} getVideos={getVideos} user={user} dashboardList={dashboardList} />
                    </div>
                </div>
            </div>
        </section>
    )
};
