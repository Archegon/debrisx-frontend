import { Box, Button, Typography, Stack, Slider } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import Header from "../../components/Header";
import VideoFeed from "../../components/VideoFeed";

const WS_URL = process.env.REACT_APP_WS_URL;

const Control = () => {
    const [ws, setWs] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState("Disconnected");
    const [servoAngle, setServoAngle] = useState(90);
    const [lastServoCommandTime, setLastServoCommandTime] = useState(0);
    const [sliderDisabled, setSliderDisabled] = useState(false);

    useEffect(() => {
        const websocket = new WebSocket(`ws://${WS_URL}/ws?client=frontend`);

        websocket.onopen = () => {
            console.log("WebSocket is open now.");
            setConnectionStatus("Connected");
        };

        websocket.onclose = () => {
            console.log("WebSocket is closed now.");
            setConnectionStatus("Disconnected");
        };

        websocket.onmessage = (event) => {
            console.log("Received from server: " + event.data);
        };

        setWs(websocket);

        return () => {
            websocket.close();
            setConnectionStatus("Disconnected");
        };
    }, []);

    const sendCommand = useCallback((command) => {
        if (ws) {
            ws.send(command);
        }
    }, [ws]);

    const handleSliderChange = (event, newValue) => {
        setServoAngle(newValue);

        const currentTime = Date.now();
        if (currentTime - lastServoCommandTime >= 1000) {
            sendCommand(`SERVO:${newValue}`);
            setLastServoCommandTime(currentTime);
            setSliderDisabled(true);

            // Re-enable the slider after 1 second
            setTimeout(() => {
                setSliderDisabled(false);
            }, 1000);
        }
    };

    return (
        <Box>
            <Header title="Control" subtitle="Manual control of system" />
            <Stack direction={'row'} width={"100%"} justifyContent={'center'} gap={2}>
                <VideoFeed raw_feed={true} />
                <Box>
                    <Typography variant="h6" align="center" gutterBottom>
                        WebSocket Status: {connectionStatus}
                    </Typography>
                    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                        <Button variant="contained" color="primary" onClick={() => sendCommand("FORWARD")} style={{ marginBottom: '8px' }}>
                            Forward
                        </Button>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Button variant="contained" color="primary" onClick={() => sendCommand("LEFT")} style={{ marginRight: '8px' }}>
                                Left
                            </Button>
                            <Button variant="contained" color="error" onClick={() => sendCommand("STOP")} style={{ margin: '0 8px' }}>
                                Stop
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => sendCommand("RIGHT")} style={{ marginLeft: '8px' }}>
                                Right
                            </Button>
                        </Box>
                        <Button variant="contained" color="primary" onClick={() => sendCommand("BACKWARD")} style={{ marginTop: '8px' }}>
                            Backward
                        </Button>
                    </Box>
                    <Box mt={4} width={200}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Servo Angle
                        </Typography>
                        <Slider
                            value={servoAngle}
                            onChange={handleSliderChange}
                            aria-labelledby="servo-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={180}
                            disabled={sliderDisabled}
                        />
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
};

export default Control;
