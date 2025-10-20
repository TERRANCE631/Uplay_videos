import { BiSolidSend } from 'react-icons/bi'
import { CommentsFn } from '../Functions/CommentsFn';
import { Link } from 'react-router-dom';

export function Comments({ videoDetails }) {
    const { scrollFunction, sendFeedback, comments, data, scrollRef, setSendComment } = CommentsFn(videoDetails);

    return (
        <section className="">
            <form onSubmit={sendFeedback} className="flex items-center">
                <input
                    required
                    type="text"
                    className="w-full border py-2.5 pl-4 border-blue-700 shadow-inner shadow-gray-500 text-black 
                    bg-gray-200 outline-none rounded-l-full"
                    placeholder={videoDetails.title}
                    name="comment"
                    onChange={(e) => setSendComment(e.target.value)}
                    id="comment"
                />
                <button onClick={() => scrollFunction(scrollRef)} className="py-2.5 border border-blue-700 md:px-8 px-4 shadow-inner shadow-gray-500 
                bg-blue-500 hover:bg-blue-400 text-2xl text-white rounded-r-full">
                    <BiSolidSend />
                </button>
            </form>

            <p className="mt-2 md:pl-0 pl-2">Comments: ({comments.length ? comments.length : 0})</p>

            <div ref={scrollRef} className="md:mt-5 mt-3 md:mb-10">
                {data.length > 0 ? data.map((comment, i) => {
                    return (
                        <div key={i} className="">
                            {comment.videoID === videoDetails.id &&
                                <div className="flex items-center border-r-2 rounded-lg border-blue-700 bg-gray-300/30 gap-2 mb-4 px-2 py-1">
                                    <Link to={`/Home/User/profile/${comment.userID}`} className="w-9 h-9 md:flex hidden border-2 border-blue-700 justify-center items-center rounded-full">
                                        <img src={comment.profile_image} alt="" className="rounded-full h-full w-full object-center object-cover" />
                                    </Link>
                                    <div className="">
                                        <p className="flex items-center gap-1">
                                            <span>{comment.comment}</span>
                                            <span className="font-thin text-gray-500">|</span>
                                            <Link to={`/Home/User/profile/${comment.userID}`} className="dark:text-gray-300 underline text-blue-700 hover:text-blue-600 transition-colors duration-500">{comment.username}</Link>
                                        </p>
                                        <p className="truncate text-sm text-gray-500 dark:text-gray-200 ">
                                            <span>Date: </span>
                                            <span>{comment.date}</span>
                                        </p>
                                    </div>
                                </div>
                            }
                        </div>
                    )
                }) : <div className="text-center">No comments</div>}
            </div>
        </section>
    )
}
