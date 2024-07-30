import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

const WS_URL = process.env.REACT_APP_WS_URL;

const Control = () => {
    const [ws, setWs] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState("Disconnected");

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

    const sendCommand = (command) => {
        if (ws) {
            ws.send(command);
        }
    };

    return (
        <Box>
            <Header title="Control" subtitle="Manual control of system" />
            <Typography variant="h6" align="center" gutterBottom>
                WebSocket Status: {connectionStatus}
            </Typography>
            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" color="primary" onClick={() => sendCommand("FORWARD")}>
                    Forward
                </Button>
                <Button variant="contained" color="secondary" onClick={() => sendCommand("BACKWARD")}>
                    Backward
                </Button>
                <Button variant="contained" color="primary" onClick={() => sendCommand("LEFT")}>
                    Left
                </Button>
                <Button variant="contained" color="secondary" onClick={() => sendCommand("RIGHT")}>
                    Right
                </Button>
            </Box>
        </Box>
    );
};

export default Control;
