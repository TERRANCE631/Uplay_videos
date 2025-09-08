import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../Hooks/Context/useContext';
import { BiUserCircle } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { AxiosInstance } from '../Lib/AxiosInstance';

export function ProfileDropdown({ setProfile }) {
    const { setSubs, user, setUser, getUserDetails } = GlobalContext()
    const navigate = useNavigate();
    const [offlineUser, setOfflineUser] = useState(false);

    const logOut = () => {
        try {
            AxiosInstance.get("/uplay/logout").then((res) => {
                const data = res.data
                toast.success(data.message)
                setUser(null)
                getUserDetails()
                if (user && data.message) {
                    setUser(null)
                    setOfflineUser(true)
                    getUserDetails()
                }
            });
            navigate("/")
            setSubs([])
            setUser(null)
            getUserDetails()

            if (offlineUser) {
                setUser(null)
                getUserDetails()
            };
        } catch (error) {
            console.log("Error in 👉👉logOut function", + " | " + error);
        } finally {
            getUserDetails()
        };
    };

    return (
        <section onClick={() => setProfile(false)} className="w-full h-screen shadow-xl shadow-black bg-opacity-10 bg-black">
            <div className="fixed backdrop-blur-lg z-40 md:w-[30%] w-[97.5%] shadow-inner shadow-gray-800 border-2 
        border-gray-500 rounded-lg right-1 top-[4rem] min-h-[20rem] bg-white/20">
                <section className="">
                    <div className=" flex flex-col items-center justify-center p-4 backdrop-blur-xl bg-blue-500/30 rounded-t-lg" >
                        <div className="md:h-[6rem] md:w-[6rem] w-[6rem] h-[6rem] rounded-full border-4 border-blue-600 hover:opacity-70">
                            <img src={user.profile_image} alt="" className="object-cover object-center h-full w-full rounded-full" />
                        </div>

                        <section className="truncate flex flex-col items-center justify-center">
                            <div className="text-2xl truncate text-white tracking-wider font-bold">{user.username}</div>

                            <Link to={`/Home/User/profile/${user.id}`} className="flex items-center gap-1 bg-blue-700 transition-all duration-300 rounded-full px-1.5 text-white py-1 mb-2 border hover:bg-gray-600 text-w justify-center">
                                <div className=""><BiUserCircle size={22} /></div>
                                <div className="text-sm tracking-wide">Profile</div>
                            </Link>
                            <div className="text-xs truncate tracking-widest font-thin text-gray-200">{user.email}</div>
                        </section>

                    </div>

                    <section onClick={() => { setProfile(false); logOut() }} className="w-full flex justify-center">
                        <button className="bg-rose-500 shadow-inner shadow-red-600 py-2 w-[90%] my-4 rounded-full hover:bg-rose-600 transition-all duration-300 text-white">
                            <span>Sign out</span>
                        </button>
                    </section>
                </section>
            </div>
        </section>
    )
}
