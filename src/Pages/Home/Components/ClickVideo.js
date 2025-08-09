import { HomeCard } from './HomeCard'
// import { VideoFilter } from './VideoFilter';
import { motion } from 'framer-motion';
import { ClickVideoFn } from './Functions/ClickVideoFn';

export function ClickVideo() {
    const { Ltext, reloadPage, Rtext, Loading, videos, user } = ClickVideoFn();

    return (
        <section>
            {/* <VideoFilter /> */}
            {Loading &&
                <div className="w-full h-[28rem] text-white rounded-lg z-50 font-bold flex-col flex items-center justify-center">
                    <div className="animate-pulse font-extrabold text-black dark:text-white text-xl font-mono">
                        {Rtext.split("").map((word, i) => (
                            <motion.p
                                initial={{ filter: "blur(10px)", opacity: 1, x: 1000 }}
                                animate={{ filter: "blur(0)", opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.1 * i }}

                                key={i}
                                className="inline-block mr-1.5"
                            >
                                {word === "" ? "\u00A0" : word}
                            </motion.p>
                        ))}
                        {Ltext.split("").map((word, i) => (
                            <motion.p
                                initial={{ filter: "blur(10px)", opacity: 1, x: -1000 }}
                                animate={{ filter: "blur(0)", opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.1 * i }}

                                key={i}
                                className="inline-block mr-1.5"
                            >
                                {word === "" ? "\u00A0" : word}
                            </motion.p>
                        ))}
                    </div>
                    <div className="tracking-wider text-xs text-black dark:text-white">
                        handling server, please wait
                    </div>
                    <div
                        onClick={reloadPage}
                        className="text-white bg-blue-700 py-2 px-4 my-2 tracking-wider"
                    >
                        Reload
                    </div>
                </div>}

            <div className="w-full grid 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-4 
            md:grid-cols-3 grid-cols-1 pb-2">
                {videos.legnth > 0 && videos.map((video, i) => {
                    return (
                        <div key={i} className="md:mb-6 mb-4 md:mx-2">
                            <HomeCard video={video} user={user} />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
