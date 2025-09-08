import React from 'react'
import { BiEdit } from 'react-icons/bi'

export function UserInfor({ user, videoLenght }) {
    return (
        <section className="-mt-3">
            <div className="sticky w-full md:h-[10rem] h-[6rem] z- bg-black border-b border-white/60">
                <img src={user.profile_image} alt="" className="objec-center object-cover opacity-30 w-full h-full -z-10" />

                <div className="absolute bottom-0 right-[1rem] text-right w-full text-white">
                    <p className="text-sm">Uploads: <span className="bg-blue-600 px-[3.5px] rounded-full border">{videoLenght.length}</span></p>
                    <p className="font-bold xl:text-4xl text-2xl md:text-3xl">{user.username}</p>
                    <p className="xl:text-[1rem] text-sm">{user.email}</p>
                </div>

                <div className="rounded-full xl:w-[11rem] xl:h-[11rem] md:w-[9rem] md:h-[9rem]
                    w-[7rem] h-[7rem] xl:mt-[4rem] md:mt-[5.5rem] mt-[2.4rem] top-0 bg-black absolute">
                    <img src={user.profile_image} alt="" className="object-center border-2 border-white/60 object-cover w-full h-full rounded-full" />
                    <button className="absolute xl:scale-[120%] border md:scale-[110%] scale-[105%] xl:left-[8.8rem] 
                        md:left-[6.5rem] md:-mt-[2.3rem] left-[5.4rem] xl:-mt-[3rem] -mt-[2.6rem] 
                        bg-gray-500 p-2 text-white rounded-full z-10">
                        <BiEdit />
                    </button>
                </div>
            </div>
        </section>
    )
}
