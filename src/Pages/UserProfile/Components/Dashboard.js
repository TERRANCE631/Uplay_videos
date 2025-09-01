import { BiSolidAddToQueue, BiSolidLike } from "react-icons/bi";
import { VideoListFn } from "../Functions/VideoListFn";
import { GlobalContext } from "../../../Hooks/Context/useContext";
import { LikesFn } from "../../VideosPlayer/Functions";

export const dashboardList = [
    {
        title: "Likes",
        dot: <span className="bg-yellow-500 border border-black px-2 rounded-full" />,
        amount: 30000,
        icon: <BiSolidLike />
    },
    {
        title: "Subscribers",
        dot: <span className="bg-green-700 border border-black px-2 rounded-full" />,
        amount: 50000,
        icon: <BiSolidAddToQueue />
    }
]


export const dataForGraph = () => {
    const { profile, subs } = GlobalContext()
    const { like } = LikesFn()

    const userLikes = like.filter((likes) => likes.videoUserID === profile.id)
    const userSubs = subs.filter((subscribe) => subscribe.videoUserID === profile.id)

    const data = [
        {
            title: "Subscribers",
            count: userSubs.length
        },
        {
            title: "Likes",
            count: userLikes.length
        }
    ];

    return { data }
}

