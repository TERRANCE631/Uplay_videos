import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";

export function SideVideos({ videos, videoDetails}) {
    const scrollToCurrentVideo = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div onClick={() => scrollToCurrentVideo()} className="mb-5">
            <div className="flex flex-col gap-1 truncate">
                {videos && videos.map((video, i) => {
                    return (
                        <Link
                            to={`/videoPlayer/${video.id}`}
                            key={i}
                            className={`w-full h-[5rem] truncate hover:bg-gray-500/30 ${videoDetails.id !== video.id && "hover:border-r-4"} hover:rounded-r-md border-blue-500 border-opacity-40`}
                        >
                            <div
                                className={videoDetails.id === video.id
                                    ? "w-full h-full flex items-center border-r-4 rounded-r-md border-blue-700 bg-gray-700 dark:bg-gray-900 text-white"
                                    : "w-full h-full flex items-center"}>
                                <div className="w-[8rem] shrink-0 h-[4.8rem] border">
                                    <video
                                        src={video.video || "/Assets/feature-5.mp4"}
                                        alt=""
                                        className="object-cover object-center w-full h-full"
                                    />
                                </div>
                                <div className="pl-1 truncate grow-0">
                                    <p className="truncate font-semibold tracking-wide">{video.title}</p>
                                    <p className="py-1 truncate flex items-center gap-1">
                                        <div><BiUserCircle size={26} className="text-blue-600" /></div>
                                        <div>{video.username}</div>
                                        <div className="flex gap-1 ml-1">
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
                                    <div className="text-xs">{video.created_At}</div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
