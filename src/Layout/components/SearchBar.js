import { BiSearch } from "react-icons/bi";
import { GlobalContext } from "../../Hooks/Context/useContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../../Lib/AxiosInstance";

export function SearchBar() {
    const { setValue, value } = GlobalContext();
    const [videos, setVideos] = useState([])
    const [currentIndex, setCurrentIndex] = useState("")
    const [text, setText] = useState("");
    let index
    let data__length = 10

    const getVideos = async () => {
        await AxiosInstance.get("/uplay/getVideos")
            .then(res => {
                const data = res.data;
                setInterval(() => {
                    placeholderFunction(data)
                }, 1000 * 15);
                setVideos(data);
            })
    };

    const videoIndex = () => {
        index = Math.floor(Math.random() * data__length)
    };

    const placeholderFunction = (data) => {
        setCurrentIndex(data[index]);
        data__length = data.length
    };

    useEffect(() => {
        getVideos();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            videoIndex()
        }, 1000 * 15);

        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [index])

    useEffect(() => {
        let textIndex = 0;
        const waitForPlaceholderText = "Loading most searched videos, please wait...";

        const interval = setInterval(() => {
            setText(
                currentIndex ? currentIndex.title.substring(0, textIndex)
                    : waitForPlaceholderText.substring(0, textIndex)
            );
            textIndex++;

            if (currentIndex && currentIndex.length && textIndex > currentIndex.title.length) {
                clearInterval(interval);
            }
        }, 60);

        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [currentIndex]);

    const filter = videos.length > 0 && videos.filter((item) => { return item.title.toLowerCase().match(value.toLowerCase()) });

    return (
        <section className="md:flex items-center hidden w-full mx-4 backdrop-blur-2xl bg-black bg-opacity-30 rounded-full relative">
            <input
                type="text"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="dark:bg-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-400 placeholder:tracking-wider shadow-inner shadow-black/40 bg-slate-200 border flex flex-grow dark:border-white/20 border-black/30 outline-none py-2 
                pl-4 rounded-l-full transition-all duration-200"
                placeholder={text}
            />
            {value !== "" &&
                <button
                    onClick={() => setValue("")}
                    className="absolute 2xl:right-[3.3%] xl:right-[7.3%] lg:right-[10%] md:right-[15%] hover:bg-transparent text-gray-500 dark:text-white/80 rounded-full scale-[185%] font-thin mx-1"
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
                    {filter.length > 0 && <section className="w-[80%] flex flex-col p-2 rounded-lg dark:bg-gray-600 truncate bg-slate-200 shadow-black shadow-lg" >
                        {filter.length > 0 && filter.slice(0, 8).map((name, i) => {
                            i += 1
                            return (
                                <Link key={i} to={`/videoPlayer/${name.id}`}
                                    className="border-gray-400 shadow-lg truncate rounded-lg border p-2 my-0.5">
                                    {name.title}
                                </Link>
                            )
                        })}
                    </section>}
                </div>}
        </section>
    )
}
