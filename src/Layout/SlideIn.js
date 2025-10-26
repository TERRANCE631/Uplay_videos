import { slideList } from './components/SlideList'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../Hooks/Context/useContext'

export function SlideIn({ setShowManu, setShowCreatePost }) {
    const { subs, userID } = GlobalContext();

    return (
        <section onClick={() => { setShowManu(false) }} className="fixed w-full flex flex-col z-50 bg-black bg-opacity-10 px-4 pt-4 left-0 text-black backdrop-blur-[1.5px]
         dark:text-white h-screen">
            <section className="fixed bg-slate-200 dark:bg-gray-800 shadow-black shadow-lg 2xl:w-[16.5%] xl:w-[20%] lg:w-[30%] md:w-[30%] w-[55%] md:flex 
            flex-col z-50 truncate px-4 pt-4 left-0 top-0 h-screen">
                <section className="flex items-center">
                    <div
                        onClick={() => { setShowManu(false) }}
                        role="button"
                        className="rounded-full text-white hover:bg-gray-500/70 bg-gray-500/30 px-2 py-[3px] scale-[130%] md:scale-[140%]">
                        &#9776;
                    </div>
                    <Link
                        onClick={() => setShowManu(false)}
                        to="/"
                    >
                        <span className="md:mx-5 mx-2 flex items-center md:scale-125 tracking-wider">
                            <span className="text-4xl text-red-500 font-extrabold">U</span>
                            <span className="text-xl">play</span>
                        </span>
                    </Link>
                </section>
                <section className="h-full overflow-y-scroll subs__scrollbar pr-2">
                    <div className="pt-6">
                        <div className="flex flex-col gap-2">
                            {slideList.map((icon, i) => {
                                return (
                                    <button key={i}>
                                        <Link
                                            to={icon.link}
                                            onClick={() => { setShowManu(false); i === 1 ? setShowCreatePost((prev) => !prev) : setShowCreatePost(false) }}
                                            key={i}
                                            className="truncate my-2 hover:bg-gray-500/10 bg-gray-500/20 rounded-lg py-2 flex
                                            flex-col justify-center items-center">
                                            {icon.icon}
                                            <p className="mt-0.5 md:text-[0.9rem] text-xs">
                                                {icon.title}
                                            </p>
                                        </Link>
                                    </button>
                                )
                            })}
                        </div>
                        <div className="border-b my-4 border-gray-500 dark:border-white" />
                    </div>

                    <p className="text-sm">Subscribtions</p>
                    <div role="button" className="">
                        {subs.length < 0 && subs.filter(item => item.userID === userID).map((sub, i) => {
                            return (
                                <Link
                                    onClick={() => setShowManu(false)}
                                    to={`/Home/User/profile/${sub.videoUserID}`}
                                    key={i}
                                    className="bg-gray-500/20 truncate hover:bg-gray-500/10 flex items-center 
                                    rounded-lg my-2 px-2 gap-1"
                                >
                                    <button className="md:h-8 md:w-8 bg-white w-8 h-8 rounded-full border 
                                hover:opacity-70 flex flex-col my-2">
                                        <img src={sub.profile_photo || "/Assets/profile.png"} alt="" className="object-cover object-center h-full w-full rounded-full" />
                                    </button>
                                    <p className="truncate">{sub.sub__To}</p>
                                </Link>
                            )
                        })}
                    </div>
                </section>
            </section>
        </section>
    )
}
