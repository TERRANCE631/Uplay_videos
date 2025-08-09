import React from 'react'
import { VideoList } from './VideoList'
import { Tabs } from './Tabs';
import { Graph } from './Graph';

export function TabList({ dashboardList, videoList, user, getVideos }) {
    const consoleIndex = (index) => {
        console.log(index);
    };

    const tabs = [
        {
            title: "Videos",
            content: <VideoList videoList={videoList} user={user} getVideos={getVideos} />,
        },
        {
            title: "More",
            content: <Graph dashboardList={dashboardList} />,
        }
    ];

    return <Tabs NavBar={tabs} onClick={consoleIndex} />
}
