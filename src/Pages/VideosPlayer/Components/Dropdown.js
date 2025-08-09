import React from 'react'
import { BiLike } from 'react-icons/bi'

export function Dropdown({ setShowDropDown, showDropDown }) {
    return (
        <section>
            <button
                onClick={() => setShowDropDown((prev) => !prev)}
                className="bg-gray-200 md:hidden block dark:bg-gray-700 hover:dark:bg-gray-800/70 hover:bg-gray-100 py-2 rounded-full"
            >
                <div className="flex flex-col gap-1 mx-4 ">
                    {[1, 2, 3].map((_, i) => {
                        return (
                            <div key={i} className="w-1 h-1 rounded-full dark:bg-white 
                                    bg-gray-700" />
                        )
                    })}
                </div>
            </button>

            {showDropDown && <dropdown className="absolute md:hidden block right-0 md:w-[10rem] w-[40%] rounded-lg 
                                mt-[5px] bg-black/20 backdrop-blur-lg">
                <section className="p-2 shadow-inner shadow-black rounded-lg">
                    <div role="button" className="flex border my-1 text-lg bg-gray-400/50 
                                hover:bg-gray-400 rounded-lg p-1 justify-center items-center gap-1">
                        <p className="scale-[160%] mx-1 text-gray-800">
                            <BiLike />
                        </p>
                        <p className="">Like</p>
                    </div>
                    <div className="border-b" />
                </section>
            </dropdown>}
        </section>
    )
}
