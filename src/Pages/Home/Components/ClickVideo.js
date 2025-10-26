import { HomeCard } from './HomeCard'
import { VideoFilter } from './VideoFilter';
import { ClickVideoFn } from './Functions/ClickVideoFn';
import { useEffect, useState } from 'react';
import { BiErrorCircle, BiUserCircle, BiX } from 'react-icons/bi';
import { GlobalContext } from '../../../Hooks/Context/useContext';
import { OnLoadingCard } from './OnLoadingCard';

export function ClickVideo() {
    const { videos, user } = ClickVideoFn();
    const [selectedValue, setSelectedValue] = useState("");
    const [togglePopUp, setTogglePopUp] = useState(false);
    const { setLogin, loadingVideos } = GlobalContext();

    const filtingVideos = videos.length > 0 && videos.filter((video) => video.category.includes(selectedValue))
    const skeletonOfLoadingVideos = Array(6).fill(null);

    useEffect(() => {
        const timeout = setTimeout(() => { !user ? setTogglePopUp(true) : setTogglePopUp(false) }, 1000 * 20)
        setTimeout(() => { clearTimeout(timeout) }, 1500 * 20)
        if (user) return setTogglePopUp(false)
    }, [user]);

    switch (selectedValue) {
        case "all":
            return setSelectedValue("");
        default:
            break;
    };

    return (
        <section>
            {videos.length > 0 && togglePopUp && <div className="w-full h-10 text-gray-700 dark:text-white tracking-wide bg-orange-300/50 flex items-center justify-between p-2 shadow-sm">
                <div className="flex items-center gap-1.5">
                    <BiUserCircle size={32} className="text-blue-500 dark:text-blue-400" />
                    <p className="">Sign in to watch videos and get full access to all features,</p>
                    <button onClick={() => setLogin(true)} className="underline active:text-red-500 dark:text-blue-500 text-blue-600">Sign in</button>
                </div>
                <button onClick={() => setTogglePopUp(false)} className="text-gray-900 dark:text-white">
                    <BiX size={25} />
                </button>
            </div>}
            <VideoFilter setSelectedValue={setSelectedValue} />
            <div className="w-full grid 2xl:grid-cols-7 xl:grid-cols-4 lg:grid-cols-3 
            md:grid-cols-2 grid-cols-1 pb-2 md:px-0 px-2">
                {!loadingVideos ? filtingVideos.length > 0 && filtingVideos.map((video, i) => {
                    i += 1
                    return (
                        <div key={i} className="md:mb-6 mb-4 md:mx-2">
                            {<HomeCard video={video} user={user} i={i} />}
                        </div>
                    )
                }) :
                    skeletonOfLoadingVideos.map((_, i) => {
                        return (
                            <div key={i} className="md:mb-6 mb-4 md:mx-2">
                                <OnLoadingCard key={i} />
                            </div>
                        )
                    })}
            </div>
            {filtingVideos.length === 0 &&
                <div className="w-full flex justify-center items-center">
                    <div className="flex border md:w-[50%] w-[90%] rounded-lg bg-gray-500 bg-opacity-40 py-20 flex-col justify-center items-center dark:text-gray-300 gap-3 text-xl">
                        <span className="animate-pulse font-extrabold"><BiErrorCircle size={90} /></span>
                        <span>No video found</span>
                    </div>
                </div>}
        </section>
    )
}
