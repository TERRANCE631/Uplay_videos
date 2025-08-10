import { Link } from "react-router-dom";
import { GlobalContext } from "../../../Hooks/Context/useContext";

export function SideVideos({ videoList, videoDetails, scrollRef }) {
    const { scrollIntoView, videos } = GlobalContext();

    return (
        <div onClick={() => scrollIntoView(scrollRef)} className="">
            <div className="flex flex-col gap-2">
                {videos && videos.map((video, i) => {
                    return (
                        <Link
                            to={`/videoPlayer/${video.id}`}
                            key={i}
                            className="w-full h-[5rem] truncate hover:bg-gray-500/30"
                        >
                            <div
                                className={videoDetails.id === video.id
                                    ? "w-full h-full flex items-center bg-gray-700 dark:bg-gray-900 text-white"
                                    : "w-full h-full flex items-center"}>
                                <div className="w-[8rem] shrink-0 h-[4.8rem] border">
                                    <video
                                        src={video.video || "/Assets/feature-5.mp4"}
                                        alt=""
                                        className="object-cover object-center w-full h-full"
                                    />
                                </div>
                                <div className="pl-1 truncate">
                                    <p className="truncate">{video.title}</p>
                                    <p className="text-gray-500 py-1 truncate flex items-center gap-2">{video.username}
                                        <div className="flex">
                                            {videoDetails.id === video.id && [1, 2, 3, 4, 5, 6].map((bar, i) => {
                                                i += 1
                                                return (
                                                    <div
                                                        key={bar}
                                                        className="indicator-line active"
                                                        style={{ animationDelay: `${bar * 0.1}s` }}
                                                    />)
                                            })}
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
