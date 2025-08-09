import React from 'react'

export function ShortsCard({ video }) {
    return (
        <section className="h-full">
            <div className="w-[20rem] h-full flex gap-6">
                <video
                    src={video.shortVideo} autoPlay
                    className="object-cover rounded-lg object-center w-full h-full"
                />
                <div className="absolute w-full h-full p-2">
                    <section className="flex items-center gap-1">
                        <div className="h-12 w-12 rounded-full">
                            <img
                                src={video.profilePicture}
                                alt=""
                                className="object-cover rounded-full object-center w-full h-full"
                            />
                        </div>
                        <p className="text-lg">Terrance</p>
                    </section>
                </div>
            </div>
        </section>
    )
}
