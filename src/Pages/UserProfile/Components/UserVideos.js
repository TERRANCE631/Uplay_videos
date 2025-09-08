import { Link } from 'react-router-dom';

export const UserVideos = ({ i, setID, vid, toggle, user, like, ID, getVideos, YesOrNo, deleteVideo, userID, setToggle }) => {
    const videoLikes = like.filter((likes) => likes.videoID === vid.id);

    return (
        <div>
            <div key={i} className="border pb-2 border-dotted border-white h-fit w-full bg-white dark:bg-gray-700 shadow-black rounded-lg shadow-md">
                <div className="border rounded-lg border-dotted h-[10rem] w-full">
                    <Link to={`/videoPlayer/${vid.id}`}>
                        <video
                            src={vid.video}
                            onError={(e) => {
                                e.target.src = "/Assets/feature-5.mp4"
                            }}
                            alt=""
                            className="object-cover object-center w-full h-full rounded-lg"
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
                    <Link to={`/videoPlayer/${vid.id}`}>
                        <p className="font-bold truncate">{vid.title}</p>
                    </Link>
                    <div className="flex justify-between items-center">
                        <p className="text-xs">{vid.created_At}</p>
                        {vid.userID === userID && <button className="flex justify-end">
                            <p onClick={() => { setToggle(true); setID(vid.title) }}
                                className="font-semibold hover:underline tracking-wide"
                            >
                                <span>Delete</span>
                            </p>
                        </button>}
                    </div>
                    <section className="flex p-1 h-full items-center justify-between">
                        <Link
                            className="flex items-center mt-2 md:-mb-2 gap-1"
                        >
                            <div className="w-9 h-9 shrink-0 rounded-full border">
                                <img src={vid.photo || "/Assets/profile.png"} alt="" className="shrink-0 object-cover bg-white rounded-full object-center 
                            w-full h-full" />
                            </div>
                            <div className="font-semibold tracking-wider truncate dark:text-gray-100">
                                {vid.username}
                                <p className="font-normal text-xs truncate">
                                    <span className="bg-blue-700 dark:bg-blue-700 px-2 text-white">Likes</span>
                                    <span className="truncate w-2 mx-1 border bg-blue-700 px-[3px] rounded-full text-white">{videoLikes.length}</span>
                                </p>
                            </div>
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    )
};

