export const OnLoadingCard = () => {
    return (
        <section className="h-full">
            <div className="h-full w-full flex flex-col pb-4 bg-white dark:bg-gray-600 shadow-md shadow-black rounded-lg dark:border-white/20">
                <div className="animate-pulse">
                    <div className="h-[10rem] bg-gray-600 dark:bg-white/40 w-full rounded-lg object-cover object-center md:rounded-t-lg" />
                </div>

                <section className="flex flex-col p-1 h-full animate-pulse">
                    <div className="flex flex-wrap py-2 truncate w-full">
                        <section className='flex gap-2 flex-col truncate w-full'>
                            <span className="bg-gray-600 dark:bg-white/40 w-full p-2.5 rounded-full" />
                            <span className="bg-gray-600 dark:bg-white/40 w-[60%] p-2.5 rounded-full" />
                        </section>
                    </div>
                    <div className="bg-gray-600 dark:bg-white/40 w-[40%] p-1 mt-1 rounded-full" />
                </section>

                <section className="flex p-1 h-full animate-pulse items-center w-full justify-between">
                    <div
                        className="flex items-center mt-2 md:-mb-2 gap-1 w-full"
                    >
                        <div className="w-9 h-9 shrink-0 rounded-full border">
                            <div className="shrink-0 bg-gray-600 dark:bg-white/40 rounded-full object-center 
                                    w-full h-full" />
                        </div>
                        <div className="font-semibold tracking-wider truncate dark:text-gray-100 w-full">
                            <div className="bg-gray-600 dark:bg-white/40 rounded-full p-2 w-[60%]" />
                            <p>
                                <span className="bg-blue-700 dark:bg-blue-700 px-6 text-white"></span>
                                <span className="truncate w-2 mx-1 border bg-blue-700 px-[8.5px] rounded-full text-white">{""}</span>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </section>

    )
}
