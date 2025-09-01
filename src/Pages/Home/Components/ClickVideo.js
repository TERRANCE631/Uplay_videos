import { HomeCard } from './HomeCard'
import { VideoFilter } from './VideoFilter';
import { ClickVideoFn } from './Functions/ClickVideoFn';
import { useState } from 'react';

export function ClickVideo() {
    const { videos, user } = ClickVideoFn();
    const [selectedValue, setSelectedValue] = useState("");
    const filtingVideos = videos.length > 0 && videos.filter((video) => video.category.includes(selectedValue));

    switch (selectedValue) {
        case "all":
            return setSelectedValue("");
        default:
            break;
    };

    return (
        <section>
            <VideoFilter setSelectedValue={setSelectedValue} />
            <div className="w-full grid 2xl:grid-cols-7 xl:grid-cols-4 lg:grid-cols-3 
            md:grid-cols-2 grid-cols-1 pb-2">
                {filtingVideos.length > 0 && filtingVideos.map((video, i) => {
                    return (
                        <div key={i} className="md:mb-6 mb-4 md:mx-2">
                            <HomeCard video={video} user={user} />
                        </div>
                    )
                })}
            </div>
            {filtingVideos.length === 0 &&
                <div className="w-full flex justify-center items-center">
                    <div className="flex border w-[50%] rounded-lg bg-gray-500 bg-opacity-40 py-20 flex-col justify-center items-center dark:text-gray-300 gap-3 text-xl">
                        <span>No videos found</span>
                        <span className="text-2xl animate-pulse font-extrabold text-blue-700 border">＞﹏＜</span>
                    </div>
                </div>}
        </section>
    )
}
