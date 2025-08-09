import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { CardDropDown } from './CardDropDown';
import { GlobalContext } from '../../../Hooks/Context/useContext';

export function HomeCard({ video, TokenCondition }) {
    // const [showDropDown, setShowDropDown] = useState(false);
    // const [videoID, setVideoID] = useState(null);
    const { likes, Likes } = GlobalContext();

    const [hover, setHover] = useState(null);
    const onHover = (onHover) => {
        setHover(onHover)
    };

    const onMouseLeave = () => {
        setHover(null)
    };

    return (
        <section className="h-full">
            <div className="h-full w-full flex flex-col mb-4 bg-white 
            dark:bg-gray-600 shadow-lg shadow-black border-b border-black md:border-2 border-dotted md:rounded-lg border-white/20 ">
                {!hover &&
                    <Link to={`/videoPlayer/${video.id}`} onMouseEnter={onHover} onClick={() => Likes(likes)} className="">
                        <video
                            src={video.video}
                            onError={(e) => {
                                e.target.src = "/Assets/feature-5.mp4"
                            }}
                            alt=""
                            className="h-[10rem] mask md:rounded-t-lg bg-white w-full object-cover object-center"
                        />
                    </Link>}
                {hover &&
                    <Link to={`/videoPlayer/${video.id}`} onMouseLeave={onMouseLeave} onClick={() => Likes(likes)} className="">
                        <video
                            autoPlay
                            muted
                            src={video.video}
                            onError={(e) => {
                                e.target.src = "/Assets/feature-5.mp4"
                            }}
                            alt=""
                            onClick={TokenCondition}
                            className="h-[10rem] bg-white w-full object-cover object-center md:rounded-t-lg"
                        />
                    </Link>}

                <section className="flex p-1 h-full">
                    <Link to={`/videoPlayer/${video.id}`} className="flex flex-wrap truncate">
                        {video.title.split(" ").map((title, i) => {
                            return (
                                <section onClick={() => Likes(likes)} key={i} className='flex items-center truncate'>
                                    <span className={`${i >= 6
                                        ? "hidden"
                                        : `${i === 5 ? "text-xl flex items-center font-bold truncate"
                                            : "text-xl mr-1 font-bold truncate"}`}`}
                                    >
                                        {title}
                                    </span>
                                    {i === 6 && <span className="text-xl flex items-center font-semibold">...</span>}
                                </section>
                            )
                        })}
                    </Link>
                </section>

                <section className="flex p-1 h-full items-center justify-between">
                    <Link to={`/Home/User/profile/${video.userID}`}
                        className="flex items-center mt-2 md:-mb-2 gap-1"
                    >
                        <div className="w-9 h-9 rounded-full border">
                            <img src={video.photo || "/Assets/profile.png"} alt="" className="object-cover bg-white rounded-full object-center 
                            w-full h-full" />
                        </div>
                        < div
                            className="font-semibold text-gray-600 truncate dark:text-gray-300"
                        >
                            {video.username}
                            <p className="font-normal text-xs truncate">
                                <span className="bg-gray-400 dark:bg-gray-800 px-2 text-white">Clicks</span>
                                <span className="truncate w-2"> 7k</span>
                            </p>
                        </div>
                    </Link>

                    {/* <button
                        onClick={() => { setShowDropDown((prev) => !prev); setVideoID(video.id) }}
                        className="bg-gray-200 dark:bg-gray-700 hover:dark:bg-gray-800/70 hover:bg-gray-100 py-2 rounded-full"
                    >
                        <div className="flex flex-col gap-[3px] mx-3 ">
                            {[1, 2, 3].map((_, i) => {
                                return (
                                    <div key={i} className="w-[2px] h-[2px] border border-gray-900 dark:border-white rounded-full dark:bg-white 
                                    bg-gray-900" />
                                )
                            })}
                        </div>
                    </button> */}
                    {/* {video.id === videoID && showDropDown && <CardDropDown />} */}
                </section>
            </div>
        </section >
    )
}
