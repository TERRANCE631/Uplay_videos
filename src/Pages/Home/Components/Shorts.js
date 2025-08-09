import React from 'react'
import { shorts } from './VideoList'
import { ShortsCard } from './ShortsCard'

export function Shorts() {
    return (
        <section>
            <div className="flex truncate gap-6 h-[30rem]">
                {shorts.map((video, i) => {
                    return (
                        <div key={i} className="h-full">
                            <ShortsCard video={video} />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
