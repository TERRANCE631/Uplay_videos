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
    const { data } = dataForGraph();

    return (
        <div className="md:h-[600px] h-[550px] my-2 pt-4 md:w-[60%] w-[86%] flex justify-center items-center">
            <ResponsiveContainer>
                <BarChart data={data}>
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#14b8a6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
