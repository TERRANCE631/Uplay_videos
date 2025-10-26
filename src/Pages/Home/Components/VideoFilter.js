import { useState } from 'react'
import { videoFilterList } from './FilterList'
import { GlobalContext } from '../../../Hooks/Context/useContext';

export function VideoFilter({ setSelectedValue }) {
    const [ID, setID] = useState(0);
    const { loadingVideos, videos } = GlobalContext();

    return (
        <div
            role="button"
            className="flex md:ml-2 my-2 md:px-0 px-2 md:text-md text-sm gap-4 truncate"
        >
            <div className="flex overflow-x-auto gap-2 filter__scrollbar">
                {videos.length > 0 && !loadingVideos && videoFilterList.map((title, i) => {
                    return (
                        <div
                            key={i}
                            onClick={() => { setID(i); setSelectedValue(title) }}
                            className={`${ID === i
                                ? "bg-blue-500 text-white tracking-wide px-2 rounded-full py-px border border-blue-500 duration-300"
                                : "bg-gray-400/30 px-2 rounded-full py-px border border-blue-500 duration-300 hover:text-blue-500 hover:bg-gray-400/50 tracking-wide"}`}>
                            {title}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
