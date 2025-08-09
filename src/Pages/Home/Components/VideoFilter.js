import React, { useState } from 'react'
import { videoFilterList } from './FilterList'

export function VideoFilter() {
    const [ID, setID] = useState(0);
    return (
        <div
            role="button"
            className="flex md:ml-2 md:text-md text-sm gap-4 truncate"
        >
            <div className="flex overflow-x-auto gap-2 filter__scrollbar">
                {videoFilterList.map((title, i) => {
                    return (
                        <div
                            key={i}
                            onClick={() => setID(i)}
                            className={`${ID === i
                                ? "dark:bg-blue-500 dark:text-black px-2 rounded-full py-px border border-blue-500 duration-300"
                                : "bg-gray-400/30 px-2 rounded-full py-px border border-blue-500 duration-300 hover:text-blue-500 hover:bg-gray-400/50"}`}>
                            {title}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
