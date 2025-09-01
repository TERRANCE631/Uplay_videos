import { BiHide, BiMessage, BiShield, BiShow, BiUser, BiX } from 'react-icons/bi';
import { RegisterFn } from './Functions/RegisterFn';

export function Register({ setRegister, setLogin }) {
    const {
        setProfile_image,
        profile_image,
        imageRef,
        UserInputs,
        userDetails,
        setUserDetails,
        showPassword, setShowPassword
    } = RegisterFn(setRegister, setLogin);

    return (
        <div className="flex flex-col fixed z-20 mt-[4.5rem] bg-black bg-opacity-10 h-screen w-full">
            <div className="fixed p-2 z-20 right-0 md:w-[40%] w-full h-screen bg-white dark:bg-gray-700 backdrop-blur-3xl bg-opacity-60 dark:bg-opacity-60">
                <button onClick={() => setRegister(false)} className="absolute flex gap-2 items-center right-2 dark:text-white">
                    <span>Close</span>
                    <span className=""><BiX className="border dark:border-white/20 hover:bg-gray-500  rounded-full dark:bg-white/10 bg-black/50 text-white scale-150" /></span>
                </button>

                <form onSubmit={UserInputs} className="mt-4 flex flex-col gap-2">
                    <p className="text-center text-xl 
                font-thin dark:bg-white bg-black text-transparent bg-clip-text tracking-wider dark:text-white text-gray-800">Sign Up</p>

                    <label className="font-thin dark:bg-white bg-black text-transparent bg-clip-text tracking-wider">Username</label>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BiUser className="size-5 dark:text-white" />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 border dark:text-white focus:border-blue-700 dark:placeholder:text-white/60 placeholder:text-black border-black dark:border-white/30 outline-none bg-transparent p-2 rounded-md tracking-wider"
                            required
                            placeholder="Username"
                            value={userDetails.username}
                            onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                        />
                    </div>

                    <label className="font-thin dark:bg-white bg-black text-transparent bg-clip-text tracking-wider">E-mail</label>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BiMessage className="size-5 dark:text-white" />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 border dark:text-white focus:border-blue-700 dark:placeholder:text-white/60 placeholder:text-black border-black dark:border-white/30 outline-none bg-transparent p-2 rounded-md tracking-wider"
                            required
                            placeholder="E-mail"
                            value={userDetails.email}
                            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
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
                            required
                            placeholder="Password"
                            value={userDetails.password}
                            onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                        />
                    </div>
                    <p className="text-center truncate">UPLOAD: {profile_image ? profile_image.name : "No Picture found"}</p>

                    <div className="flex justify-center items-center">
                        <button type="button" onClick={() => imageRef.current?.click()} className="my-2 w-[60%] py-2 rounded-lg text-white shadow-inner shadow-blue-900 bg-blue-600 flex justify-center items-center">
                            <span>Upload your profile picture</span>
                        </button>
                    </div>

                    <input
                        ref={imageRef}
                        onChange={(e) => setProfile_image(e.target.files[0])}
                        required
                        name="profile_image"
                        id="profile_image"
                        type="file"
                        className="hidden w-full py-2 outline-none upload__btn rounded-lg border 
                            dark:border-white bg-transparent border-gray-600 focus:border-blue-600 focus:shadow-blue-600 focus:shadow-sm"
                    />

                    <p className="">
                        <span className="dark:text-white">Already have an account? </span>
                        <span
                            onClick={() => { setRegister(false); setLogin(true) }}
                            role="button"
                            className="text-blue-600 hover:underline">
                            Sign In
                        </span>
                    </p>

                    <button type="submit" className="uppercase w-full py-2 flex justify-center items-center gap-1.5 bg-blue-600 dark:text-white 
                        text-white rounded-lg shadow-inner shadow-blue-900 active:shadow-none">
                        <span>Sign Up</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
