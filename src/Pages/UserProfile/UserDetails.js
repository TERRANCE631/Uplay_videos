import axios from "axios"
import { dashboardList } from "./Components/Dashboard"
import { UserInfor } from "./Components/UserInfor"
import { useEffect, useState } from "react"
import { TabList } from "./Components/TabList"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../Hooks/Context/useContext"
import { AxiosInstance } from "../../Lib/AxiosInstance"

export function UserDetails() {
    const { getVideos, getUserDetails, videos, profile, setProfile } = GlobalContext()
    const { id } = useParams();

    // getting current user details
    const getUsersById = async () => {
        await AxiosInstance.get(`/uplay/userprofile/${id}`)
            .then(res => {
                const data = res.data
                setProfile(data)
            });
    };

    useEffect(() => {
        getUserDetails()
        getUsersById()
        // eslint-disable-next-line
    }, [profile.id, id])
    // end of getting current user datails
    const videoLenght = videos.filter((prev) => prev.userID === profile.id);

    return (
        <section className="bg-black/80 w-full dark:bg-gray-700 overflow-hidden">
            <div className="min-h-full">
                <div className="">
                    <div className="">
                        <UserInfor user={profile} videoLenght={videoLenght} />
                    </div>
                    <div className="md:pt-[6rem] pt-[4rem] h-full w-full">
                        <TabList videos={videos} getVideos={getVideos} user={profile} dashboardList={dashboardList} />
                    </div>
                </div>
            </div>
        </section>
    )
};
