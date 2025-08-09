import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { GlobalContext } from '../../Hooks/Context/useContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function MobileSearchBar({ currentScrollY, showSearch }) {
    const { setValue, value } = GlobalContext();
    const [videos, setVideos] = useState([])

    const getVideos = async () => {
        await axios.get("http://localhost:9000/uplay/getVideos?_sort=id&&_order=dis")
            .then(res => {
                const data = res.data;
                setVideos(data);
            })
    };

    // useEffect(() => {
    //     getVideos();
    // }, []);

    const filter = videos.filter((item) => { return item.title.toLowerCase().includes(value.toLowerCase()) });

    return (
        <section className={`${currentScrollY > 0 ? "w-screen transition-all duration-500"
            : showSearch ? "w-screen h-screen bg-black bg-opacity-20 transition-all duration-500"
                : "w-screen transition-all duration-500 shadow-xl shadow-black"}`}>
            {showSearch &&
                <nav className="flex items-center my-1 flex-grow w-full justify-center">
                    <section className="mt-[4.7rem] flex w-full flex-grow px-0.5 items-center md:hidden">
                        <input
                            onChange={(e) => setValue(e.target.value)}
                            type="text"
                            value={value}
                            className="bg-gray-200 flex border flex-grow w-full shadow-inner shadow-black outline-none border-gray-500 py-2 pl-4 rounded-l-full"
                            placeholder="Search video here"
                        />
                        {value !== "" &&
                            <button
                                onClick={() => setValue("")}
                                className="absolute right-[25.5%] text-white bg-gray-500/30 hover:bg-gray-500/10 
                                rounded-full scale-[165%] font-thin px-2"
                            >
                                &times;
                            </button>}
                        <span className="text-2xl text-white border bg-gray-500 py-2 px-6 rounded-r-full border-gray-500">
                            <BiSearch />
                        </span>
                    </section>
                </nav>}
            {value !== "" &&
                <result className="flex md:hidden my-[3.5rem] justify-center items-center inset-x-0 top-[4.5rem] min-h-20 absolute">
                    <section className="w-[90%] flex flex-col p-2 rounded-lg truncate bg-slate-200 shadow-black shadow-lg" >
                        {filter.slice(0, 8).map((name, i) => {
                            return (
                                <Link
                                    onClick={() => setValue("")}
                                    key={i}
                                    to={`/videoPlayer/${name.id}`}
                                    className="border-gray-400 shadow-lg truncate rounded-lg border p-2 my-0.5"
                                >
                                    {name.title}
                                </Link>
                            )
                        })}
                    </section>
                </result>}
        </section>

    )
}
