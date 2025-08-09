import { BiDownload } from 'react-icons/bi'

export function CardDropDown() {
    return (
        <dropdown className="absolute md:w-[10rem] w-[50%] 2xl:ml-[7rem] xl:ml-[2rem] lg:ml-[4rem] md:ml-[3.5rem] rounded-lg 
                md:mt-[7rem] small medium large mt-[6.5rem] bg-black/20 backdrop-blur-lg">
            <section className="p-2 hover:bg-gray-400 shadow-inner shadow-black rounded-lg">
                <div role="button" className="flex border my-1 text-lg justify-center bg-gray-400/50 
                    hover:bg-gray-400 rounded-lg p-1 items-center gap-1">
                    <p className="text-blue-600 hover:bg-gray-400">
                        <BiDownload />
                    </p>
                    <p className="hover:bg-gray-400">Download</p>
                </div>
            </section>
        </dropdown>

    )
}
