import React from 'react'

export function SearchResults({ video }) {
    return (
        <section>
            <div className="flex px-2 dark:hover:bg-gray-600 hover:bg-slate-100 md:mb-4 mb-2">
                <div className="border md:h-[11rem] truncate md:w-[18rem] h-[5rem] w-[8rem] md:mt-0 my-1 shrink-0 bg-black">
                    <img src={video.video} alt="" className="relative object-cover object-center w-full h-full" />
                </div>
                <div className="ml-2 justify-between flex truncate flex-col">
                    <div className="">
                        <p className="w-[96%] md:text-2xl lg:text-3xl text-lg font-semibold truncate">{video.title}</p>
                        <p className="bg-gray-300 dark:bg-gray-800 w-fit px-1 text-xs md:text-[1.2rem] text-gray-700 dark:text-white"
                        >
                            {video.name}
                        </p>
                    </div>

                    <section className="flex items-center gap-2 py-1">
                        <div className="md:w-11 md:h-11 h-8 w-8 border rounded-full">
                            <img src={video.profileImage} alt="" className="object-cover object-center w-full h-full rounded-full" />
                        </div>
                        <p className="bg-gray-300 text-xs md:text-sm lg:text-[1.2rem] dark:bg-gray-800 px-1 font-mono tracking-tight">Downloads - 10k<span>
                        </span>
                        </p>
                        <p className="bg-gray-300 md:block hidden dark:bg-gray-800 lg:text-[1.2rem] md:text-sm px-1 font-mono tracking-tight" >Clicks  - 10k</p>
                        <p className="bg-gray-300 md:block hidden dark:bg-gray-800 md:text-sm px-1 lg:text-[1.2rem] font-mono tracking-tight">Likes  - 10k</p>
                    </section>
                </div>
            </div>
        </section>
    )
}
