import { BiErrorCircle, BiNotification, BiUndo, BiUserPlus } from 'react-icons/bi';
import { RegisterFn } from './Functions/RegisterFn';

export function Register({ setRegister, setLogin }) {
    const {
        setProfile_image,
        registered,
        state,
        setState,
        UserInputs,
        userDetails,
        setUserDetails
    } = RegisterFn(setRegister, setLogin);

    return (
        <div className="flex flex-col fixed z-20 mt-[4.5rem] bg-black bg-opacity-40 h-screen w-full">
            <div className="fixed p-2 z-20 right-0 md:w-[50%] w-full border-l w-full h-screen bg-slate-100 dark:bg-gray-700">

                <p className="border-b dark:border-white border-gray-600 text-center text-xl 
                    font-extrabold tracking-wide dark:text-white text-gray-800">Sign Up</p>

                <div className={`${state.usernameErr !== ""
                    ? "flex flex-col justify-center items-center duration-500 translate-x-0"
                    : "flex flex-col justify-center items-center duration-500 translate-x-[120%]"}`}
                >
                    <div className={`${state.usernameErr !== ""
                        ? "bg-slate-300 gap-1 md:w-[90%] px-2 w-full text-sm flex absolute py-1 items-center rounded-lg border border-gray-600 dark:text-black"
                        : "hidden"
                        }`}>
                        <p className="text-red-600 scale-150"><BiErrorCircle /></p>
                        <p className="">{state.usernameErr}</p>
                    </div>
                </div>

                <div className={`${registered !== ""
                    ? "flex flex-col justify-center items-center duration-500 translate-x-0"
                    : "flex flex-col justify-center items-center duration-500 translate-x-[120%]"}`}
                >
                    <div className={`${registered !== ""
                        ? "bg-slate-300 gap-1 md:w-[90%] px-2 w-full text-sm flex absolute py-1 z-20 items-center rounded-lg border border-gray-600 dark:text-black"
                        : "hidden"
                        }`}>
                        <p className="text-blue-600 scale-150"><BiNotification /></p>
                        <p className="">{registered}</p>
                    </div>
                </div>

                <div className={`${state.existingUser !== ""
                    ? "flex flex-col justify-center items-center duration-500 translate-x-0"
                    : "flex flex-col justify-center items-center duration-500 translate-x-[120%]"}`}
                >
                    <div className={`${state.existingUser !== ""
                        ? "bg-slate-300 gap-1 md:w-[90%] px-2 w-full text-sm flex absolute py-1 z-10 items-center rounded-lg border border-gray-600 dark:text-black"
                        : "hidden"
                        }`}>
                        <p className="text-blue-600 scale-150"><BiErrorCircle /></p>
                        <p className="">{state.existingUser}</p>
                    </div>
                </div>

                <form onSubmit={UserInputs} className="mt-4 flex flex-col gap-2">
                    <div className="">
                        <label htmlFor="username" className="dark:text-white">Userame</label>
                        <input
                            required
                            type="text"
                            name="username"
                            id="username"
                            value={userDetails.username}
                            onChange={(e) => {
                                userDetails.username !== "" && setState({ ...state, existingUser: "", usernameErr: "", registered: "" })
                                setUserDetails({ ...userDetails, username: e.target.value })
                            }}
                            className="w-full focus:border-blue-600 duration-100 focus:shadow-blue-600 focus:shadow-sm py-2 outline-none pl-2 
                            dark:border-white border-gray-600 rounded-lg dark:text-white bg-transparent border"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="email" className="dark:text-white">E-mail</label>
                        <input
                            required
                            type="text"
                            name="email"
                            id="email"
                            value={userDetails.email}
                            onChange={(e) => {
                                userDetails.email !== "" && setState({ ...state, existingUser: "", usernameErr: "", registered: "" })
                                setUserDetails({ ...userDetails, email: e.target.value })
                            }}
                            className="w-full py-2 outline-none pl-2 dark:border-white border-gray-600 
                            dark:text-white bg-transparent border rounded-lg duration-100 focus:border-blue-600 focus:shadow-blue-600 focus:shadow-sm"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="password" className="dark:text-white">Passoword</label>
                        <input
                            required
                            type="text"
                            name="password"
                            id="password"
                            value={userDetails.password}
                            onChange={(e) => {
                                userDetails.password !== "" && setState({ ...state, existingUser: "", usernameErr: "", registered: "" })
                                setUserDetails({ ...userDetails, password: e.target.value })
                            }}
                            className="w-full py-2 outline-none pl-2 dark:border-white duration-100 border-gray-600 
                            dark:text-white bg-transparent border rounded-lg focus:border-blue-600 focus:shadow-blue-600 focus:shadow-sm"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="profile_image" className="dark:text-white">Upload Profile Picture</label>
                        <input
                            onChange={(e) => setProfile_image(e.target.files[0])}
                            name="profile_image"
                            id="profile_image"
                            type="file"
                            className="w-full py-2 outline-none upload__btn rounded-lg border 
                            dark:border-white bg-transparent border-gray-600 focus:border-blue-600 focus:shadow-blue-600 focus:shadow-sm"
                        />
                    </div>

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
                        text-white rounded-lg">
                        <span>Sign Up</span>
                        <span>
                            <BiUserPlus className="scale-150" />
                        </span>
                    </button>

                    <button
                        onClick={() => setRegister(false)}
                        className="uppercase rounded-lg w-full py-2 bg-gray-400 flex justify-center items-center dark:text-white text-white">
                        <span>Cancel</span>
                        <span>
                            <BiUndo className="scale-150" />
                        </span>
                    </button>
                </form>
            </div>

        </div>
    )
}
