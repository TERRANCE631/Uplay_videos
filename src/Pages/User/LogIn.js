import { BiErrorCircle, BiHide, BiLogInCircle, BiNotification, BiShield, BiShow, BiUndo, BiUser, BiX } from 'react-icons/bi';
import { LogInFn } from './Functions/LogInFn';

export function LogIn({ setRegister, setLogin }) {
    const { UserInputs, err, setUserInputs, userInputs, showPassword, setShowPassword } = LogInFn(setLogin);

    return (
        <div className="flex flex-col fixed z-20 mt-[4.5rem] text-white bg-black bg-opacity-50 h-screen w-full">
            <div className="fixed p-2 z-20 right-0 md:w-[40%] w-full h-screen backdrop-blur-3xl">
                <button className="absolute flex gap-2 items-center right-2 text-white">
                    <span>Close</span>
                    <span className=""><BiX className="border border-white/20 hover:bg-gray-500  rounded-full bg-white/10 scale-150" /></span>
                </button>

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
                </div>

                <form onSubmit={UserInputs} className="mt-4 flex flex-col justify-center h-[460px] gap-2">
                    <p className="text-center text-xl 
                font-thin bg-white text-transparent bg-clip-text tracking-wider dark:text-white text-gray-800">Sign In</p>

                    <label className="font-thin bg-white text-transparent bg-clip-text tracking-wider">Username</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BiUser className="size-5 text-white" />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 border text-white focus:border-blue-700 placeholder:text-white/60 border-white/30 outline-none bg-transparent p-2 rounded-md tracking-wider"
                            placeholder="Terrance"
                            value={userInputs.username}
                            onChange={(e) => setUserInputs({ ...userInputs, username: e.target.value })}
                        />
                    </div>
                    <label className="font-thin bg-white text-transparent bg-clip-text tracking-wider">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BiShield className="size-5 text-base-content/40" />
                        </div>

                        {showPassword ? <div onClick={() => setShowPassword(false)} className="absolute inset-y-0 right-0 pr-3 flex border-l border-white/30 pl-2.5 items-center cursor-pointer">
                            <BiHide className="size-5 text-base-content/40" />
                        </div>
                            :
                            <div onClick={() => setShowPassword(true)} className="absolute inset-y-0 right-0 pr-3 flex border-l border-white/30 pl-2.5 items-center cursor-pointer">
                                <BiShow className="size-5 text-base-content/40" />
                            </div>
                        }

                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full pl-10 border focus:border-blue-700 placeholder:text-white/60 border-white/30 outline-none bg-transparent p-2 rounded-md tracking-wider"
                            placeholder="******************"
                            value={userInputs.password}
                            onChange={(e) => setUserInputs({ ...userInputs, password: e.target.value })}
                        />
                    </div>
                    <p className="">
                        <span className="dark:text-white">Don't have an account? </span>
                        <span
                            type="submit"
                            onClick={() => { setRegister(true); setLogin(false) }}
                            className="text-blue-600 hover:underline">
                            Sign Up
                        </span>
                    </p>
                    <button type="submit" className="">
                        <div className="uppercase flex justify-center items-center gap-1.5 w-full py-2 bg-blue-600 dark:text-white 
                        text-white rounded-lg">
                            <span>Sign In </span>
                        </div>
                    </button>
                    {/* <div
                        type="button"
                        onClick={() => setLogin(false)}
                        className="uppercase w-full  rounded-lg py-2 bg-gray-400 dark:text-white flex justify-center items-center text-white">
                        <span>Cancel</span><span><BiUndo className="scale-150" /></span>
                    </div> */}
                </form>
            </div>
        </div>
    )
}
