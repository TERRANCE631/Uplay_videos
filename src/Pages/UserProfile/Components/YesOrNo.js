import React from 'react'

export function YesOrNo({ setToggle, deleteVideo, ID, getVideos }) {
    return (
        <div className="fixed backdrop-blur-xl bg-black bg-opacity-50 mt-[4.5rem] md:pl-[4rem] text-center inset-0 flex justify-center items-center">
            <div className="flex flex-col fixed z-10">
                <p className="text-white">Are you sure you want to delete this video({ID})?</p>
                <div className="flex gap-6 justify-center items-center my-2" >
                    <button
                        onClick={() => { deleteVideo(ID); setToggle(false); getVideos(); }}
                        className="bg-red-600 py-2 px-10 rounded-lg"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => setToggle(false)}
                        className="bg-blue-600 py-2 px-10 rounded-lg"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}
