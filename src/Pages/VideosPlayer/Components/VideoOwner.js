import { Link } from "react-router-dom"
import { BiAddToQueue, BiLike, BiSolidAddToQueue, BiSolidLike } from 'react-icons/bi';
import { LikesFn } from '../Functions/LikesFn';
import { GlobalContext } from "../../../Hooks/Context/useContext";
import { SubscribeFn } from "../Functions";

export function VideoOwner({ username, photo, title, id, videoDetails }) {
  const { subs, GetSubscribers } = GlobalContext();

  const {
    existOrNot,
    like,
    likes,
    handleDelete,
    Likes,
    user,
    getLikes,
    userId
  } = LikesFn(id);

  const {
    exist,
    Subscribers,
    DeleteSub,
    amountOfSubs
  } = SubscribeFn(id, userId, subs, GetSubscribers, videoDetails, username, user, photo);

  return (
    <section className="md:text-[16px] text-sm">
      <section>
        <p className="md:text-3xl text-2xl font-extrabold w-full">
          {title}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <p className="text-gray-600 flex gap-2 md:text-md text-sm dark:text-gray-100">
            <span className="font-bold">Likes: </span>
            <span className="bg-blue-600 px-1 rounded-full text-white border border-gray-600">{likes.length || 0}</span>
            <span className="font-bold">Subscribers: </span>
            <span className="bg-blue-600 px-1 rounded-full text-white border border-gray-600">{amountOfSubs.length || 0}</span>
          </p>
        </div>

        <section className="truncate flex justify-between items-center 
            rounded-lg my-2 gap-1">
          <div className="truncate flex items-center gap-1">
            <Link to={`/Home/User/profile/${videoDetails.userID}`} className="md:h-10 md:w-10 bg-white w-10 h-10 rounded-full border 
            hover:opacity-70 flex my-2 shrink-0">
              <img
                src={photo || "/Assets/profile.png"}
                alt=""
                className="object-cover object-center h-full w-full rounded-full"
              />
            </Link>
            <p className="truncate md:block hidden">{username}</p>
            {!exist &&
              <button
                onClick={() => { Subscribers(); GetSubscribers() }}
                className="truncate flex items-center gap-2 bg-gray-300 ml-4 shadow-gray-600 hover:dark:bg-gray-500/40 dark:bg-gray-700/40 
                shadow-inner hover:bg-gr  ay-200 px-4 py-1 
                border border-black/30 rounded-full"
              >
                <span className="text-blue-600 scale-150"><BiAddToQueue /></span>
                <span>Subscribe</span>
              </button>}
            {exist &&
              <section>
                {/* eslint-disable-next-line  */}
                {subs.length > 0 && subs.filter(item => item.videoUserID === videoDetails.userID && item.userID === userId).slice(0, 1).map((sub, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => { DeleteSub(sub.id); GetSubscribers() }}
                      className="truncate flex items-center gap-2 bg-gray-300 ml-4 shadow-gray-600 hover:dark:bg-gray-500/40 dark:bg-gray-700/40 
                      shadow-i  nner hover:bg-gray-200 px-4 py-1 
                      border border-black/30 rounded-full"
                    >
                      <span className="text-blue-600 scale-150"><BiSolidAddToQueue /></span>
                      <span>Unsubscribe</span>
                    </button>)
                })}
              </section>
            }
          </div>

          <div className="flex">
            {!existOrNot &&
              <section className="w-full">
                <button
                  onClick={() => { Likes(); getLikes() }}
                  className="truncate flex md:hidden items-center gap-2 shadow-gray-600 shadow-inner hover:dark:bg-gray-500/40 dark:bg-gray-700/40 
                      bg-gray-300 hover:bg-gray-200 px-4 py-1 
                      rounded-full border border-black/30 w-full"
                >
                  <span className="text-blue-600 scale-150"><BiLike /></span>
                  <button className="">Like</button>
                </button>
              </section>
            }

            {existOrNot &&
              <section>
                {/*  eslint-disable-next-line  */}
                {like.length > 0 && like.filter(item => item.videoID == id && item.userID == userId).slice(0, 1).map((like, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => { handleDelete(like.id); getLikes() }}
                      className="truncate flex md:hidden items-center gap-2 shadow-gray-600 shadow-inner hover:dark:bg-gray-500/40 dark:bg-gray-700/40 
                    bg-gray-300 hover:bg-gray-200 px-4 py-1 
                    rounded-full border border-black/30"
                    >
                      <span className="text-blue-600 scale-150"><BiSolidLike /></span>
                      <button>Unlike</button>
                    </button>
                  )
                })}
              </section>
            }


            {!existOrNot &&
              <section>
                <button
                  onClick={() => { Likes(); getLikes() }}
                  className="truncate md:flex items-center gap-2 hidden shadow-gray-600 shadow-inner hover:dark:bg-gray-500/40 dark:bg-gray-700/40 
                      bg-gray-300 hover:bg-gray-200 px-4 py-1 
                      rounded-full border border-black/30"
                >
                  <span className="text-blue-600 scale-150"><BiLike /></span>
                  <button>Like</button>
                </button>
              </section>
            }

            {existOrNot &&
              <section>
                {/*  eslint-disable-next-line  */}
                {like.length > 0 && like.filter(item => item.videoID == id && item.userID == userId).slice(0, 1).map((like, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => { handleDelete(like.id); getLikes() }}
                      className="truncate md:flex items-center gap-2 hidden shadow-gray-600 shadow-inner hover:dark:bg-gray-500/40 dark:bg-gray-700/40 
                    bg-gray-300 hover:bg-gray-200 px-4 py-1 
                    rounded-full border border-black/30"
                    >
                      <span className="text-blue-600 scale-150"><BiSolidLike /></span>
                      <button>Unlike</button>
                    </button>
                  )
                })}
              </section>
            }
            {/* <Dropdown setShowDropDown={setShowDropDown} showDropDown={showDropDown} /> */}

          </div>
        </section>
      </section>
    </section>
  )
}
