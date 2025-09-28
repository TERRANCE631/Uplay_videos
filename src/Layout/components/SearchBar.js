import { BiSearch } from "react-icons/bi";
import { GlobalContext } from "../../Hooks/Context/useContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export function SearchBar() {
    const { setValue, value } = GlobalContext();
    const [videos, setVideos] = useState([])
    const [currentIndex, setCurrentIndex] = useState("")
    const [text, setText] = useState("");
    let index
    let data__length

    const getVideos = async () => {
        await axios.get("http://localhost:9000/uplay/getVideos")
            .then(res => {
                const data = res.data;
                setInterval(() => {
                    placeholderFunction(data)
                }, 1000 * 15);
                setVideos(data);
            })
    };

    function videoIndex() {
        index = Math.floor(Math.random() * data__length)
    };

    useEffect(() => {
        const interval = setInterval(() => {
            videoIndex()
        }, 1);

        return () => clearInterval(interval);
    }, [index]) 

    const placeholderFunction = (data) => {
        setCurrentIndex(data[index]);
        data__length = data.length
    };

    useEffect(() => {
        getVideos();
    }, []);


    useEffect(() => {
        let textIndex = 0;
        const waitForPlaceholderText = "Waiting for the most searched videos...";

        const interval = setInterval(() => {
            setText(
                currentIndex ? currentIndex.title.substring(0, textIndex)
                    : waitForPlaceholderText.substring(0, textIndex)
            );
            textIndex++;

            if (textIndex > currentIndex.title.length) {
                clearInterval(interval);
            }
        }, 60);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const filter = videos.length > 0 && videos.filter((item) => { return item.title.toLowerCase().match(value.toLowerCase()) });

    return (
        <section className="md:flex items-center hidden w-full mx-4">
            <input
                type="text"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="dark:bg-gray-600 placeholder:text-gray-600 dark:placeholder:text-gray-200 placeholder:tracking-wider shadow-inner shadow-black/40 bg-slate-200 border flex flex-grow dark:border-white/20 border-black/30 outline-none py-2 
                pl-4 rounded-l-full transition-all duration-200"
                placeholder={text}
            />
            {value !== "" &&
                <button
                    onClick={() => setValue("")}
                    className="absolute 2xl:right-[8.3%] xl:right-[14.3%] lg:right-[20%] md:right-[26%] 
                bg-gray-500/30 hover:bg-transparent text-gray-600 dark:text-white rounded-full scale-[185%] font-thin px-2"
                >
                    &times;
                </button>}

            <button className="text-2xl hover:bg-gray-500/80 bg-gray-500/70 text-white border dark:border-white/20
                 border-black/30 py-2 px-4 rounded-r-full">
                <BiSearch />
            </button>
            {value !== "" && filter.length !== 0 &&
                <div
                    onClick={() => setValue("")}
                    className="flex justify-center items-center inset-x-0 top-[4.5rem] ite min-h-20 absolute"
                >
                    <section className="w-[80%] flex flex-col p-2 rounded-lg dark:bg-gray-600 truncate bg-slate-200 shadow-black shadow-lg" >
                        {filter.slice(0, 8).map((name, i) => {
                            i += 1
                            return (
                                <Link key={i} to={`/videoPlayer/${name.id}`}
                                    className="border-gray-400 shadow-lg truncate rounded-lg border p-2 my-0.5">
                                    {name.title}
                                </Link>
                            )
                        })}
                    </section>
                </div>}

        </section>
    )
}
