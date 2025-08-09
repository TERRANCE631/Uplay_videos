import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { data } from './Dashboard';

export function AnaliticGraph() {
    return (
        <div className="reletive h-screen my-2 pt-4 md:w-full flex justify-center border items-center">
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
