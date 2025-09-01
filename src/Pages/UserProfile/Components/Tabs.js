import { useState } from 'react'

export function Tabs({ NavBar }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const getIndex = (index) => {
        setCurrentIndex(index);
    };
    console.log(currentIndex);

    return (
        <div className="p-2">
            <div className="flex">
                {NavBar.map((tab, i) => {
                    return (
                        <button
                            key={tab.title}
                            onClick={() => getIndex(i)}
                            className={currentIndex === i
                                ? `bg-slate-200 border ${i === 0 ? "rounded-tl-lg" : "rounded-tr-lg"}  dark:border-gray-800 dark:bg-gray-800 py-2 px-6`
                                : `border dark:border-gray-800 text-white py-2 px-6 ${i === 1 ? "rounded-tr-lg" : "rounded-tl-lg"}`}
                        >
                            <div className="">
                                {tab.title}
                            </div>
                        </button>
                    )
                })}
            </div>
            <div className="flex shadow-lg shadow-black rounded-r-lg rounded-bl-lg flex-col h-screen bg-slate-200 dark:bg-gray-800 ">
                {NavBar[currentIndex] && NavBar[currentIndex].content}
            </div>
        </div>
    )
}
