import axios from "axios"
import { GlobalContext } from "../../Hooks/Context/useContext";
import { useState } from "react";
import { BiLoader, BiUpload, BiX } from "react-icons/bi";
import { useRef } from "react";

export function CreatePost({ setShowCreatePost }) {
    const { Loading, user } = GlobalContext();
    const [post, setPost] = useState(false);
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    const uploadVideo = useRef(null);

    const postVideo = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        formData.append("username", user.username);
        formData.append("photo", user.profile_image);
        formData.append("userID", user.id);

        try {
            setPost(true)
            await axios.post(`${process.env.REACT_APP_API_URL}/uplay/videos`, formData)
                .then(() => {
                    window.location.reload()
                });
        } catch (error) {
            console.log("Error occurred in postVideo function", + " | " + error);
        } finally {
            setPost(false)
        }

    };

    return (
        <div className="flex flex-col fixed z-20 mt-[4.5rem] xl:pl-[4rem] md:pl-[8%] lg:pl-[6%] bg-black bg-opacity-10 h-screen w-full">
            <form onSubmit={postVideo} className="lg:w-[40%] md:w-[40%] w-[100%] flex flex-col gap-6 bg-slate-100 h-full  p-2 
            dark:bg-gray-700 dark:text-white backdrop-blur-3xl bg-opacity-60">
                <div className="justify-end flex">
                    <button onClick={() => setShowCreatePost(false)} type="button" className="flex gap-2 items-center right-2 dark:text-white">
                        <span>Close</span>
                        <span className=""><BiX className="border dark:border-white/20 hover:bg-gray-500 rounded-full dark:bg-white/10 bg-black/50 text-white scale-150" /></span>
                    </button>
                </div>

                <div className="">
                    <label htmlFor="title" className="text-[19px]">Title</label>
                    <textarea
                        required
                        rows={7}
                        name="title"
                        placeholder="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga quod nobis porro quasi harum provident placeat, laboriosam in sapiente aperiam dignissimos corrupti alias omnis cupiditate. Expedita at assumenda sed commodi a voluptate beatae ipsam minus mollitia blanditiis porro, quo rerum debitis, consectetur fugiat enim autem tenetur delectus laborum aliquam qui!"
                        type="text"
                        className="w-full tracking-wider bg-white/80 bg-opacity-60 dark:bg-gray-700 rounded-lg shadow-md shadow-black p-1 outline-none border placeholder:text-black/75 dark:placeholder:text-white/80 border-white/20"
                    />
                </div>

                <div className="flex w-full justify-between items-center gap-2">
                    <div className="w-full">
                        {/* <label htmlFor="category" className="text-[19px]">Category</label> */}
                        <select required name="category" className="w-full rounded-lg h-full dark:bg-gray-700 outline-none py-3 bg-white/80 border border-white/20 bg-opacity-60 shadow-md shadow-black">
                            <option value="gaming">Gaming</option>
                            <option value="education">Education</option>
                            <option value="content">Content</option>
                            <option value="music">Music</option>
                        </select>
                    </div>
                    <button type="button" onClick={() => uploadVideo.current?.click()} className="border h-full flex items-center text-3xl bg-white/80 bg-opacity-60 dark:bg-gray-700 rounded-lg px-3 border-white/20 shadow-md shadow-black">
                        <BiUpload />
                    </button>
                </div>

                <input ref={uploadVideo} required name="video" type="file" accept="video/mp4" className="w-full py-2 outline-none upload__btn border hidden
                    dark:border-white bg-transparent border-gray-600" />

                <div className="">
                    <button
                        disabled={token ? "" : "disabeled"}
                        type="submit"
                        className={!Loading && token ? "bg-blue-700 hover:bg-blue-600 py-2 rounded-lg w-full text-white"
                            : "bg-blue-700 hover:bg-blue-600 opacity-50 cursor-not-allowed rounded-lg py-2 w-full text-white uppercase"}
                    >
                        {token && !Loading ?
                            <div className="">
                                {post ?
                                    <div className="flex items-center justify-center gap-2">
                                        <span><BiLoader className="animate-spin h-6 w-6 text-white" /></span>
                                        <span className="">Posting...</span>
                                    </div>
                                    : <span className="">Upload</span>}
                            </div> :
                            <div className="animate-pulse">Button locked, sign in</div>}
                    </button>
                </div>
            </form>
        </div>
    )
}
