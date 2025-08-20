import React from 'react'
import { VideoList } from './VideoList'
import { Tabs } from './Tabs';
import { Graph } from './Graph';

export function TabList({ dashboardList, videos, user, getVideos }) {
    const consoleIndex = (index) => {
        console.log(index);
    };

    const tabs = [
        {
            title: "Videos",
            content: <VideoList videos={videos} user={user} getVideos={getVideos} />,
        },
        {
            title: "More",
            content: <Graph dashboardList={dashboardList} />,
        }
    ];

    return <Tabs NavBar={tabs} onClick={consoleIndex} />
}
