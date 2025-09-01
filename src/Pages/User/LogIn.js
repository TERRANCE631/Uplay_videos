import { BiErrorCircle, BiHide, BiLoader, BiLogInCircle, BiNotification, BiShield, BiShow, BiUndo, BiUser, BiX } from 'react-icons/bi';
import { LogInFn } from './Functions/LogInFn';

export function LogIn({ setRegister, setLogin }) {
    const { UserInputs, setUserInputs, userInputs, showPassword, setShowPassword, logingIn } = LogInFn(setLogin);

    return (
        <div className="flex flex-col fixed inset-0 z-20 mt-[4.5rem] dark:text-white bg-black bg-opacity-10 h-screen w-full">
            <div className="fixed p-2 z-20 right-0 md:w-[40%] w-full h-screen backdrop-blur-3xl dark:bg-gray-700 bg-opacity-60 dark:bg-opacity-60 bg-white">
                <button onClick={() => setLogin(false)} className="absolute flex gap-2 items-center right-2 dark:text-white">
                    <span>Close</span>
                    <span className=""><BiX className="border dark:border-white/20 hover:bg-gray-500  rounded-full dark:bg-white/10 bg-black/50 text-white scale-150" /></span>
                </button>
                {/* 
                <div className={`${err.error !== ""
                    ? "flex flex-col justify-center items-center duration-500 translate-x-0"
                    : "flex flex-col justify-center items-center duration-500 translate-x-[120%]"}`}
                >
                    <div className={`${err.error !== ""
                        ? "bg-slate-300 gap-1 md:w-[90%] p-2 text-sm flex absolute justify-center py-2 items-center rounded-lg border border-gray-600 dark:text-white"
                        : "hidden"
                        }`}>
                        <p className="text-red-600 scale-150"><BiErrorCircle /></p>
                        <p className="text-black tracking-wide">{err.error}</p>
                    </div>
                </div>

                <div className={`${err.loggedIn !== ""
                    ? "flex flex-col justify-center items-center duration-500 translate-x-0"
                    : "flex flex-col justify-center items-center duration-500 translate-x-[120%]"}`}
                >
                    <div className={`${err.loggedIn !== ""
                        ? "bg-slate-300 gap-1 md:w-[90%] p-2 text-sm flex absolute justify-center py-2 items-center rounded-lg border border-gray-600 dark:text-white"
                        : "hidden"
                        }`}>
                        <p className="text-blue-600 scale-150"><BiNotification /></p>
                        <p className="text-black tracking-wide">{err.loggedIn}</p>
                    </div>
                </div> */}

                <form onSubmit={UserInputs} className="mt-4 flex flex-col justify-center h-[460px] gap-2">
                    <p className="text-center text-xl 
                font-thin dark:bg-white bg-black text-transparent bg-clip-text tracking-wider dark:text-white text-gray-800">Sign In</p>

                    <label className="font-thin dark:bg-white bg-black text-transparent bg-clip-text tracking-wider">Username</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BiUser className="size-5 dark:text-white" />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 border dark:text-white focus:border-blue-700 dark:placeholder:text-white/60 placeholder:text-black border-black dark:border-white/30 outline-none bg-transparent p-2 rounded-md tracking-wider"
                            placeholder="Username"
                            value={userInputs.username}
                            onChange={(e) => setUserInputs({ ...userInputs, username: e.target.value })}
                        />
                    </div>
                    <label className="font-thin dark:bg-white bg-black text-transparent bg-clip-text tracking-wider">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BiShield className="size-5 text-base-content/40" />
                        </div>

                        {showPassword ? <div onClick={() => setShowPassword(false)} className="absolute inset-y-0 right-0 pr-3 flex border-l dark:border-white/30 border-black pl-2.5 items-center cursor-pointer">
                            <BiHide className="size-5 text-base-content/40" />
                        </div>
                            :
                            <div onClick={() => setShowPassword(true)} className="absolute inset-y-0 right-0 pr-3 flex border-l dark:border-white/30 border-black pl-2.5 items-center cursor-pointer">
                                <BiShow className="size-5 text-base-content/40" />
                            </div>
                        }

                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full pl-10 border focus:border-blue-700 dark:placeholder:text-white/60 dark:border-white/30 border-black outline-none placeholder:text-black bg-transparent p-2 rounded-md tracking-wider"
                            placeholder="Password"
                            value={userInputs.password}
                            onChange={(e) => setUserInputs({ ...userInputs, password: e.target.value })}
                        />
                    </div>
                    <p className="">
                        <span className="dark:text-white">Don't have an account? </span>
                        <button
                            type="button"
                            onClick={() => { setRegister(true); setLogin(false) }}
                            className="text-blue-600 hover:underline">
                            Sign Up
                        </button>
                    </p>
                    <button type="submit" className="">
                        <div className="uppercase flex justify-center items-center gap-1.5 w-full py-2 bg-blue-600 shadow-inner shadow-blue-900 dark:text-white 
                        text-white rounded-lg">
                            {logingIn ?
                                <span className="flex justify-center items-center gap-2">
                                    <span><BiLoader /></span>
                                    <span>Logging in...</span>
                                </span> : <span>Sign In </span>}
                        </div>
                    </button>
                </form>
            </div>
        </div>
    )
}
