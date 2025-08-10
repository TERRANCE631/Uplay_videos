import { BiSolidSend } from 'react-icons/bi'
import { CommentsFn } from '../Functions/CommentsFn';

export function Comments({ videoDetails }) {
    const { scrollIntoView, sendFeedback, comments, data, scrollRef } = CommentsFn(videoDetails);

    return (
        <section className="">
            <form onSubmit={sendFeedback} className="flex items-center">
                <input
                    required
                    type="text"
                    className="w-full border py-2.5 pl-4 border-blue-700 shadow-inner shadow-gray-500 text-black 
                    bg-gray-200 outline-none rounded-l-full"
                    placeholder="Comment here"
                    name="comment"
                    id="comment"
                />
                <button onClick={() => scrollIntoView(scrollRef)} className="py-2.5 border border-blue-700 md:px-8 px-4 shadow-inner shadow-gray-500 
                bg-blue-500 text-2xl rounded-r-full">
                    <BiSolidSend />
                </button>
            </form>

            <p className="mt-2">Comments: ({comments.length ? comments.length : 0})</p>

            <div className="mt-5 mb-10">
                {data.length < 0 ? data.map((comment, i) => {
                    return (
                        <div key={i} className="">
                            {comment.videoID === videoDetails.id &&
                                <div className="flex items-baseline bg-gray-300/30 gap-2 mb-2 px-2 py-1">
                                    <button className="">
                                        <p className="font-bold">{comment.username}:</p>
                                    </button>
                                    <div className="">
                                        <p className="truncate">{comment.comment}</p>
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
            <div ref={scrollRef} />
        </section>
    )
}
