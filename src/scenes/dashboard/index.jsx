import { Box, Grid, Typography } from "@mui/material";
import Header from "../../components/Header";
import Card from "../../components/Card";
import VideoFeed from "../../components/VideoFeed";

const Dashboard = () => {
    return (
        <Box>
            <Header title="Dashboard" subtitle="Welcome to your dashboard" />
            <Grid container spacing={2}>
                <Grid item>
                    <Card title={'Camera'} description={'View your camera feed'}>
                        <Box>
                            <VideoFeed />
                        </Box>
                    </Card>
                </Grid>
                <Grid item>
                    <Card title={'Client Resources'} description={'% resource consumption'}>
                        <Box>
                            <img src={'https://blog.hubspot.com/hs-fs/hubfs/Google%20Drive%20Integration/types%20of%20charts_32023-May-22-2023-10-17-26-0670-PM.png?width=600&height=451&name=types%20of%20charts_32023-May-22-2023-10-17-26-0670-PM.png'} alt={'Performance Chart'} />
                        </Box>
                    </Card>
                </Grid>
                <Grid item>
                    <Card title={'Statistics'} description={'Technical stats'}>
                        <Box>
                            <Typography>
                                Latency: 200ms <br />
                                Throughput: 100mbps <br />
                                CPU: 20% <br />
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;