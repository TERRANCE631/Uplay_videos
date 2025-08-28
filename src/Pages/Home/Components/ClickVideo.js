import { HomeCard } from './HomeCard'
import { VideoFilter } from './VideoFilter';
import { ClickVideoFn } from './Functions/ClickVideoFn';
import { useState } from 'react';

export function ClickVideo() {
    const { videos, user } = ClickVideoFn();
    const [selectedValue, setSelectedValue] = useState("");
    const filtingVideos = videos.length > 0 && videos.filter((video) => video.category.includes(selectedValue));
    console.log(selectedValue);

    switch (selectedValue) {
        case "all":
            return setSelectedValue("");
        default:
            break;
    };

    return (
        <section>
            <VideoFilter setSelectedValue={setSelectedValue} />
            <div className="w-full grid 2xl:grid-cols-8 xl:grid-cols-5 lg:grid-cols-4 
            md:grid-cols-3 grid-cols-1 pb-2">
                {filtingVideos.length > 0 && filtingVideos.map((video, i) => {
                    return (
                        <div key={i} className="md:mb-6 mb-4 md:mx-2">
                            <HomeCard video={video} user={user} />
                        </div>
                    )
                })}
            </div>
            {filtingVideos.length === 0 && <div className="flex flex-col justify-center items-center text-gray-300 text-xl">
                <span>No videos found</span>
                <span className="text-2xl animate-pulse">＞﹏＜</span>
            </div>}
        </section>
    )
}
