import React, { useState } from 'react'

export function Tabs({ NavBar, onClick }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const getIndex = (index) => {
        setCurrentIndex(index);
        onClick(index);
    };
    console.log(currentIndex);

    return (
        <div className="" >
            <div className="flex">
                {NavBar.map((tab, i) => {
                    return (
                        <button
                            key={tab.title}
                            onClick={() => getIndex(i)}
                            className={currentIndex === i
                                ? "bg-slate-200 border dark:border-gray-800 dark:bg-gray-800 py-2 px-6"
                                : "border dark:border-gray-800 py-2 px-6"}
                        >
                            <div className="">
                                {tab.title}
                            </div>
                        </button>
                    )
                })}
            </div>
            <div className="flex flex-col h-screen bg-slate-200 dark:bg-gray-800 ">
                {NavBar[currentIndex] && NavBar[currentIndex].content}
            </div>
        </div>
    )
}
