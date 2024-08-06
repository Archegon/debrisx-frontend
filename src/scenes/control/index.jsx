import { Box, Button, Typography, Stack, Slider, Chip, IconButton } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Header from "../../components/Header";
import VideoFeed from "../../components/VideoFeed";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import DangerousIcon from '@mui/icons-material/Dangerous';

const WS_URL = process.env.REACT_APP_BACKEND_IP;

const Control = () => {
    const [ws, setWs] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState("Disconnected");
    const [servoAngle, setServoAngle] = useState(90);
    const [lastServoCommandTime, setLastServoCommandTime] = useState(0);
    const [sliderDisabled, setSliderDisabled] = useState(false);
    const [sensorData, setSensorData] = useState({
        distance_1: null,
        distance_2: null,
        tds: null,
        turbidity: null,
    });
    const [sensorDataHistory, setSensorDataHistory] = useState([]);

    useEffect(() => {
        const websocket = new WebSocket(`ws://${WS_URL}/ws?client=frontend`);
        setWs(websocket);

        websocket.onopen = () => {
            console.log("WebSocket is open now.");
            setConnectionStatus("Connected");
        };

        websocket.onclose = () => {
            console.log("WebSocket is closed now.");
            setConnectionStatus("Disconnected");
        };

        websocket.onerror = (error) => {
            console.log("WebSocket error: ", error);
            setConnectionStatus("Disconnected");
        };

        websocket.onmessage = (event) => {
            console.log("Received from server: " + event.data);
            if (event.data.startsWith("SENSOR_DATA:")) {
                const data = JSON.parse(event.data.replace("SENSOR_DATA:", ""));
                setSensorData(data);

                // Add timestamp to data
                const timestampedData = {
                    ...data,
                    timestamp: new Date().toLocaleTimeString(),
                };

                setSensorDataHistory((prevHistory) => {
                    const newHistory = [...prevHistory, timestampedData];
                    // Keep only the last 2 minutes of data (assuming data is received every 2 seconds)
                    return newHistory.slice(-60);
                });
            }
        };

        // Monitor connection status more frequently
        const monitorConnection = setInterval(() => {
            if (websocket.readyState === WebSocket.OPEN) {
                setConnectionStatus("Connected");
            } else {
                setConnectionStatus("Disconnected");
            }
        }, 1000); // Check every second

        return () => {
            websocket.close();
            setConnectionStatus("Disconnected");
            clearInterval(monitorConnection);
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
            <Stack direction="row" width="100%" height={"100%"} justifyContent="center" gap={2}>
                <Box>
                    <VideoFeed raw_feed={true} />
                </Box>
                <Stack direction={'column'}>
                    <Stack direction={'column'} justifyContent={'center'} gap={2}>
                        <Typography variant="h6" align="center" gutterBottom>
                            WebSocket Status: {connectionStatus}
                        </Typography>
                        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                            <IconButton size="large" color="primary" onClick={() => sendCommand("FORWARD")} style={{ marginBottom: '8px' }}>
                                <KeyboardDoubleArrowUpIcon />
                            </IconButton>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <IconButton variant="contained" color="primary" onClick={() => sendCommand("LEFT")} style={{ marginRight: '8px' }}>
                                    <KeyboardDoubleArrowLeftIcon />
                                </IconButton>
                                <IconButton variant="contained" color="error" onClick={() => sendCommand("STOP")} style={{ margin: '0 8px' }}>
                                    <DangerousIcon />
                                </IconButton>
                                <IconButton variant="contained" color="primary" onClick={() => sendCommand("RIGHT")} style={{ marginLeft: '8px' }}>
                                    <KeyboardDoubleArrowRightIcon />
                                </IconButton>
                            </Box>
                            <IconButton variant="contained" color="primary" onClick={() => sendCommand("BACKWARD")} style={{ marginTop: '8px' }}>
                                <KeyboardDoubleArrowDownIcon />
                            </IconButton>
                        </Box>
                        <Stack direction={'column'} alignItems={'center'}>
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
                                sx={{
                                    maxWidth: 300
                                }}
                            />
                            <Stack mt={4} width={200} gap={1}>
                                <Typography variant="h6" align="center" gutterBottom>
                                    Sensor Data
                                </Typography>
                                <Chip
                                    label={`Distance 1: ${sensorData.distance_1 !== null ? `${sensorData.distance_1.toFixed(2)} cm` : 'N/A'}`}
                                    variant="outlined"
                                />
                                <Chip
                                    label={`Distance 2: ${sensorData.distance_2 !== null ? `${sensorData.distance_2.toFixed(2)} cm` : 'N/A'}`}
                                    variant="outlined"
                                />
                                <Chip
                                    label={`TDS: ${sensorData.tds !== null ? `${sensorData.tds.toFixed(2)} ppm` : 'N/A'}`}
                                    variant="outlined"
                                />
                                <Chip
                                    label={`Turbidity: ${sensorData.turbidity !== null ? `${sensorData.turbidity.toFixed(2)} NTU` : 'N/A'}`}
                                    variant="outlined"
                                />
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction={'column'} justifyContent={'center'} gap={4}>
                    <Typography variant="h6" align="center" gutterBottom>
                        TDS Data History (Last 2 Minutes)
                    </Typography>
                    <ResponsiveContainer width={640} height={300}>
                        <LineChart data={sensorDataHistory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="tds" stroke="#ffc658" />
                        </LineChart>
                    </ResponsiveContainer>
                    <Typography variant="h6" align="center" gutterBottom>
                        Turbidity Data History (Last 2 Minutes)
                    </Typography>
                    <ResponsiveContainer width={640} height={300}>
                        <LineChart data={sensorDataHistory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="turbidity" stroke="#ff7300" />
                        </LineChart>
                    </ResponsiveContainer>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Control;