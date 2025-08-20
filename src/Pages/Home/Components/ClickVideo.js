import { HomeCard } from './HomeCard'
import { VideoFilter } from './VideoFilter';
import { ClickVideoFn } from './Functions/ClickVideoFn';
import { BiAddToQueue } from 'react-icons/bi';

export function ClickVideo() {
    const { videos, user } = ClickVideoFn();

    return (
        <section>
            <VideoFilter />
            <div className="w-full grid 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-4 
            md:grid-cols-3 grid-cols-1 pb-2">
                {videos.length > 0 ? videos.map((video, i) => {
                    return (
                        <div key={i} className="md:mb-6 mb-4 md:mx-2">
                            <HomeCard video={video} user={user} />
                        </div>
                    )
                }) :
                    <div className="flex items-center justify-center absolute inset-0 flex-col gap-1">
                        <span className="text-xl dark:text-gray-200 text-gray-600">No content found, be the first to post</span>
                        <BiAddToQueue className="h-10 w-10 opacity-50" />
                    </div>
                }
            </div>
        </section>
    )
}
