import axios from "axios"
import { dashboardList } from "./Components/Dashboard"
import { UserInfor } from "./Components/UserInfor"
import { useEffect, useState } from "react"
import { TabList } from "./Components/TabList"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../Hooks/Context/useContext"

export function UserDetails() {
    const { getVideos, getUserDetails, videos } = GlobalContext()
    const { id } = useParams();
    const [user, setUser] = useState({});

    // getting current user details
    const getUsersById = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/uplay/userprofile/${id}`)
            .then(res => {
                const data = res.data
                setUser(data)
            });
    };

    useEffect(() => {
        getUserDetails()
        getUsersById()
        // eslint-disable-next-line
    }, [user.id, id])
    // end of getting current user datails

    const videoLenght = videos.filter((prev) => prev.userID === user.id);
    return (
        <section className="">
            <div className="min-h-full">
                <div className="">
                    <div className="">
                        <UserInfor user={user} videoLenght={videoLenght} />
                    </div>
                    <div className="md:pt-[6rem] pt-[4rem]">
                        <TabList videos={videos} getVideos={getVideos} user={user} dashboardList={dashboardList} />
                    </div>
                </div>
            </div>
        </section>
    )
};
