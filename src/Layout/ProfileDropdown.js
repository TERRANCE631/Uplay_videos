import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../Hooks/Context/useContext';

export function ProfileDropdown({ setProfile }) {
    const navigate = useNavigate()
    const logOut = () => {
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userID");
        navigate("/")
        // window.location.reload()
    };

    const userID = JSON.parse(sessionStorage.getItem("userID"));
    const { getUserDetails, user } = GlobalContext()

    useEffect(() => {
        getUserDetails()
        // eslint-disable-next-line
    }, [userID])

    return (
        <section onClick={() => setProfile(false)} className="w-full h-screen shadow-xl shadow-black bg-opacity-20 bg-black">
            <div className="fixed backdrop-blur-lg z-40 md:w-[30%] shadow-inner shadow-gray-800 border-2 
        border-gray-500 rounded-lg right-1 top-[4rem] min-h-[20rem] bg-white/20">
                <section className="">
                    <div className=" flex flex-col items-center justify-center p-4 backdrop-blur-xl bg-blue-500/30 rounded-t-lg" >
                        <div className="md:h-[6rem] md:w-[6rem] w-10 h-10 rounded-full border-4 border-blue-600 hover:opacity-70">
                            <img src={user.profile_image} alt="" className="object-cover object-center h-full w-full rounded-full" />
                        </div>
                        <section className="truncate flex flex-col items-center justify-center">
                            <div className="text-2xl truncate text-white tracking-wider font-bold">{user.username}</div>
                            <div className="text-xs truncate tracking-wider">{user.email}</div>
                        </section>
                    </div>

                    <section onClick={() => { setProfile(false); logOut() }} className="w-full flex justify-center">
                        <button className="bg-rose-500 shadow-inner shadow-red-600 py-2 w-[90%] my-4 rounded-full text-white">
                            Sign Out
                        </button>
                    </section>
                </section>
            </div>
        </section>
    )
}
