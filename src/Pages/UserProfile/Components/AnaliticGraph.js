import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { dataForGraph } from './Dashboard';

export function AnaliticGraph() {
    const { data, userLikes, userSubs } = dataForGraph();

    return (
        <div className="md:h-[600px] h-[550px] my-2 pt-4 md:w-[60%] w-[86%] flex justify-center items-center">
            {userLikes.length + userSubs.length > 0 ?
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <XAxis dataKey="title" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#14b8a6" />
                    </BarChart>
                </ResponsiveContainer>
                : <div className="absolute inset-x-0 md:pt-[5.2rem] pt-[5rem] xl:pl-[4rem] md:pl-[8%] lg:pl-[6%] flex dark:text-white flex-col justify-center items-center">
                    <div className="my-2 text-xl">Oops no likes and subscribers found, post more videos</div>
                    <div className="md:text-6xl text-4xl p-2 animate-pulse">{".·´¯`(>▂<)´¯`·."}</div>
                </div>}
        </div>
    )
}
