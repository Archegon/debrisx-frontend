import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";
import Card from "../../components/Card";

const Dashboard = () => {
    return (
        <Box>
            <Header title="Dashboard" subtitle="Welcome to your dashboard" />
            <Grid container spacing={2}>
                <Grid item>
                    <Card title={'Camera'} description={'View your camera feed'}>
                        <Box>
                            <img src={'https://via.placeholder.com/640'} alt={'camera feed'} />
                        </Box>
                    </Card>
                </Grid>
                <Grid item>
                    <Card title={'Client Resources'} description={'View your camera feed'}>
                        <Box>
                            <img src={'https://via.placeholder.com/640'} alt={'Performance Chart'} />
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;