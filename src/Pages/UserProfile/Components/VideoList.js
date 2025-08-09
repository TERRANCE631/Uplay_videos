import { Link } from "react-router-dom"
import { YesOrNo } from "./YesOrNo";
import { VideoListFn } from "../Functions/VideoListFn";

export function VideoList({ user, videoList, getVideos }) {
    const { ID, setID, toggle, setToggle, userID, deleteVideo } = VideoListFn(videoList);

    return (
        <div className="grid h-full w-full 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 md:mx-2 py-2 gap-5">
            {videoList.length ? videoList.filter((prev) => prev.userID === user.id).map((vid, i) => {
                return (
                    <div key={i} className="border border-dotted border-white h-fit w-full bg-slate-200/20 shadow-black shadow-lg">
                        <div className="border border-dotted h-[12rem] w-full">
                            <Link to={`/videoPlayer/${vid.id}`}>
                                <video
                                    src={vid.video}
                                    onError={(e) => {
                                        e.target.src = "/Assets/feature-5.mp4"
                                    }}
                                    alt=""
                                    className="object-cover object-center w-full h-full"
                                />
                            </Link>

                            {toggle && <YesOrNo
                                ID={ID}
                                getVideos={getVideos}
                                deleteVideo={deleteVideo}
                                setToggle={setToggle}
                            />}
                        </div>

                        <div className="h-full p-1 w-full">
                            {vid.userID === userID && <button className="flex justify-end shadow-red-900 shadow-inner rounded-lg">
                                <p onClick={() => { setToggle(true); setID(vid.id) }}
                                    className="py-2 px-2 bg-red-600 shadow-red-600 shadow-lg hover:bg-red-500 text-white rounded-lg mb-1">Delete {vid.id}</p>
                            </button>}
                            {/* <Link to={`/videoPlayer/${vid.id}`}>
                                <p className="font-bold">{vid.title}</p>
                            </Link> */}
                            <div className="flex justify-between">
                                <p className="text-xs">{vid.date}</p>
                            </div>
                        </div>
                    </div>
                )
            }) : <div className="w-screen flex flex-col justify-center items-center">
                <div className="my-2 text-xl">Oops no videos found, post videos</div>
                <div className="md:text-6xl text-4xl">{".·´¯`(>▂<)´¯`·."}</div>
            </div >}
        </div>
    )
}   
