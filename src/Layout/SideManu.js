import { manuList } from "./components/ManuList";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Hooks/Context/useContext";

export function SideManu({ setShowCreatePost }) {
  const { subs, userID } = GlobalContext();

  return (
    <div className="fixed md:flex hidden backdrop-blur-2xl bg-white z-30 flex-col mt-[4rem] truncate px-2 pt-4 left-0 
    xl:w-[4rem] lg:w-[6%] md:w-[8%] dark:text-white h-screen dark:bg-gray-700">
      <div className="flex flex-col gap-2">
        {manuList.map((icon, i) => {
          return (
            <Link
              key={i}
              onClick={() => i === 1 ? setShowCreatePost((prev) => !prev) : setShowCreatePost(false)}
              to={icon.link}
              className="truncate my-2 border dark:border-white/20 border-black/30 hover:bg-gray-500 bg-gray-500/10 
                rounded-lg py-2 flex flex-col justify-center items-center hover:text-white">
              {icon.icon}
            </Link>
          )
        })}
      </div>
      <div className="border-b my-4 border-gray-500 dark:border-white" />

      <div className="flex flex-col justify-center items-center overflow-y-hidden">
        {subs.length > 0 && subs.filter(item => item.userID === userID).map((sub, i) => {
          return (
            <Link key={i} to={`/Home/User/profile/${sub.videoUserID}`} className="md:h-10 md:w-10 w-9 h-9 rounded-full border hover:opacity-70 flex flex-col my-0.5">
              <img src={sub.profile_photo || "/Assets/profile.png"} alt="" className="object-cover bg-white object-center h-full w-full rounded-full" />
            </Link>
          )
        })}
      </div>

      <span className="flex justify-center items-center hover:bg-gray-500/30 rounded-lg p-1">
        <svg
          data-accordion-icon
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          >
          </path>
        </svg>
      </span>
    </div>
  )
}
