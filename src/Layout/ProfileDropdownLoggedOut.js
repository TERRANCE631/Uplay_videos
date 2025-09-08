
export default function ProfileDropdownLoggedOut({ setLogin, setProfile, setRegister }) {
    return (
        <section onClick={() => setProfile(false)} className="w-full h-screen shadow-xl shadow-black bg-opacity-10 bg-black">
            <div className="fixed backdrop-blur-lg md:w-[40%] lg:w-[30%] z-40 shadow-inner shadow-gray-800 border-2 
                border-gray-500 rounded-lg right-1 top-[4rem] min-h-[20rem] bg-white/20">
                <div className="flex flex-col justify-center items-center">
                    <section className="w-full flex justify-center">
                        <button onClick={() => { setLogin((prev) => !prev); setProfile((prev) => !prev); setRegister(false) }} className="bg-blue-500 shadow-inner shadow-blue-900 py-2 w-[90%] my-4 rounded-lg text-white">
                            Sign In
                        </button>
                    </section>
                    <p className="text-white">OR</p>
                    <section className="w-full flex justify-center">
                        <button onClick={() => { setRegister((prev) => !prev); setProfile((prev) => !prev); setLogin(false) }} className="bg-blue-500 shadow-inner shadow-blue-900 py-2 w-[90%] my-4 rounded-lg text-white">
                            Sign Up
                        </button>
                    </section>
                </div>
                <section className="flex flex-col gap-5 justify-center items-center">
                    <div className="text-4xl dark:text-white">
                        {".·´¯`(>▂<)´¯`·."}
                    </div>
                    <p className="dark:text-white font-mono">Sign in to see stats</p>
                </section>
            </div>
        </section>
    )
}
