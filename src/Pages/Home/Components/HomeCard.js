import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../Hooks/Context/useContext';
import { LikesFn } from '../../VideosPlayer/Functions/LikesFn';

export function HomeCard({ video, TokenCondition, user }) {
    // const [showDropDown, setShowDropDown] = useState(false);
    // const [videoID, setVideoID] = useState(null);
    const { likes, Likes } = GlobalContext();
    const { like } = LikesFn()
    const [hover, setHover] = useState(null);
    const onHover = (onHover) => {
        setHover(onHover)
    };

    const onMouseLeave = () => {
        setHover(null)
    };
    const videoLikes = like.filter((likes) => likes.videoID === video.id)

    return (
        <section className="h-full">
            <div className="h-full w-full flex flex-col pb-2 bg-white 
            dark:bg-gray-600 shadow-md shadow-black md:rounded-lg dark:border-white/20">
                {!hover &&
                    <Link to={`/videoPlayer/${video.id}`} onMouseEnter={onHover} onClick={() => Likes(likes)} className="">
                        <video
                            src={video.video}
                            onError={(e) => {
                                e.target.src = "/Assets/feature-5.mp4"
                            }}
                            alt=""
                            className="h-[10rem] mask md:rounded-lg bg-white w-full object-cover object-center"
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
                            className="h-[10rem] bg-white w-full rounded-lg object-cover object-center md:rounded-t-lg"
                        />
                    </Link>}

                <section className="flex p-1 h-full">
                    <Link className="flex flex-wrap truncate">
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
                <div className="text-xs px-1">{video.created_At}</div>

                <section className="flex p-1 h-full items-center justify-between">
                    <Link to={user && `/Home/User/profile/${video.userID}`}
                        className="flex items-center mt-2 md:-mb-2 gap-1"
                    >
                        <div className="w-9 h-9 shrink-0 rounded-full border">
                            <img src={video.photo || "/Assets/profile.png"} alt="" className="shrink-0 object-cover bg-white rounded-full object-center 
                            w-full h-full" />
                        </div>
                        <div className="font-semibold tracking-wider truncate dark:text-gray-100">
                            {video.username}
                            <p className="font-normal text-xs truncate">
                                <span className="bg-blue-700 dark:bg-blue-700 px-2 text-white">Likes</span>
                                <span className="truncate w-2 mx-1 border bg-blue-700 px-[3px] rounded-full text-white">{videoLikes.length}</span>
                            </p>
                        </div>
                    </Link>
                </section>
            </div>
        </section>
    )
}
