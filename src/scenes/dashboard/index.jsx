import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import Card from "../../components/Card";
import VideoFeed from "../../components/VideoFeed";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const layout = [
    { i: 'camera', x: 0, y: 0, w: 4, h: 9 },
    { i: 'resources', x: 4, y: 0, w: 3, h: 5 },
    { i: 'statistics', x: 7, y: 0, w: 2, h: 3 },
];

const Dashboard = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Update the width state on window resize
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        // Set the initial height and width
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <Box>
            <Header title="Dashboard" subtitle="Welcome to your dashboard" />
            <GridLayout
                className="layout"
                layout={layout}
                cols={12}
                containerPadding={[0, 0]}
                rowHeight={64}
                width={width}
                isDraggable={true}
                isResizable={true}
                draggableCancel=".no-drag"
            >
                <div key="camera">
                    <Card title="Camera" description="View your camera feed">
                        <Box>
                            <VideoFeed />
                        </Box>
                    </Card>
                </div>
                <div key="resources">
                    <Card title="Client Resources" description="% resource consumption">
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            width="100%"
                            height="100%"
                        >
                            <img
                                src="https://blog.hubspot.com/hs-fs/hubfs/Google%20Drive%20Integration/types%20of%20charts_32023-May-22-2023-10-17-26-0670-PM.png?width=600&height=451&name=types%20of%20charts_32023-May-22-2023-10-17-26-0670-PM.png"
                                alt="Performance Chart"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </Box>
                    </Card>
                </div>
                <div key="statistics">
                    <Card title="Statistics" description="Technical stats">
                        <Box>
                            <Typography>
                                Latency: 200ms <br />
                                Throughput: 100mbps <br />
                                CPU: 20% <br />
                            </Typography>
                        </Box>
                    </Card>
                </div>
            </GridLayout>
        </Box>
    );
};

export default Dashboard;
