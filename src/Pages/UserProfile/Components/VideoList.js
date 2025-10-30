import { YesOrNo } from "./YesOrNo";
import { VideoListFn } from "../Functions/VideoListFn";
import { LikesFn } from "../../VideosPlayer/Functions/LikesFn";
import { UserVideos } from "./UserVideos";

export function VideoList({ user, videos, getVideos }) {
    const { videoDetails, setVideoDetails, toggle, setToggle, userID, deleteVideo } = VideoListFn(videos, getVideos, user);
    const { like } = LikesFn();
    const filteredVideos = videos.length > 0 && videos.filter((prev) => prev.userID === user.id)

    return (
        <div className="grid h-full w-full 2xl:grid-cols-7 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:mx-2 py-2 px-2 gap-5">
            {filteredVideos.length > 0 ? filteredVideos.map((vid, i) => {
                return (
                    <UserVideos i={i} setVideoDetails={setVideoDetails} vid={vid} toggle={toggle} user={user} like={like} videoDetails={videoDetails} getVideos={getVideos} YesOrNo={YesOrNo} deleteVideo={deleteVideo} userID={userID} setToggle={setToggle} />
                )
            }) :
                <div className="absolute inset-x-0 md:pt-[5.2rem] pt-[5rem] xl:pl-[4rem] md:pl-[8%] lg:pl-[6%] flex dark:text-white flex-col justify-center items-center">
                    <div className="my-2 text-xl">Oops no videos found, post videos</div>
                    <div className="md:text-6xl text-4xl p-2 animate-pulse">{".·´¯`(>▂<)´¯`·."}</div>
                </div>
            }
        </div>
    )
}   
