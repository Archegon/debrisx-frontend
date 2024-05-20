import React, { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Button, Stack, Typography } from '@mui/material';

// Define API endpoints
const API_BASE_URL = 'http://localhost:5000/api';

const startPredictedFeed = async () => {
    const response = await axios.get(`${API_BASE_URL}/predicted_feed/start`);
    return response.data;
};

const stopPredictedFeed = async () => {
    const response = await axios.get(`${API_BASE_URL}/predicted_feed/stop`);
    return response.data;
};

const VideoFeed = () => {
    const imgRef = useRef(null);
    const videoContainerRef = useRef(null);
    const [isStreaming, setIsStreaming] = useState(false);

    const startMutation = useMutation({
        mutationFn: startPredictedFeed,
        onSuccess: () => {
            if (imgRef.current) {
                imgRef.current.src = `${API_BASE_URL}/predicted_feed`;
                setIsStreaming(true);
            }
        },
    });

    const stopMutation = useMutation({
        mutationFn: stopPredictedFeed,
        onSuccess: () => {
            if (imgRef.current) {
                imgRef.current.src = '';
                setIsStreaming(false);
            }
        },
    });

    const handleStart = () => {
        startMutation.mutate();
    };

    const handleStop = () => {
        stopMutation.mutate();
    };

    const handleFullscreen = () => {
        if (videoContainerRef.current) {
            if (videoContainerRef.current.requestFullscreen) {
                videoContainerRef.current.requestFullscreen();
            } else if (videoContainerRef.current.mozRequestFullScreen) { // Firefox
                videoContainerRef.current.mozRequestFullScreen();
            } else if (videoContainerRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
                videoContainerRef.current.webkitRequestFullscreen();
            } else if (videoContainerRef.current.msRequestFullscreen) { // IE/Edge
                videoContainerRef.current.msRequestFullscreen();
            }
        }
    };

    return (
        <Stack spacing={2} direction={'column'} alignItems={'center'}>
            <Box ref={videoContainerRef} sx={{ position: 'relative', width: '640px', height: '640px' }}>
                <img
                    ref={imgRef}
                    src=""
                    alt="Predicted Video Feed"
                    style={{
                        position: "absolute",
                        width: '100%',
                        height: '100%',
                        display: isStreaming ? 'block' : 'none',
                        zIndex: 2,
                        objectFit: 'contain',
                    }}
                />
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'grey',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1,
                    }}
                >
                    <Typography variant='h5' color='textSecondary'>
                        No Video Feed
                    </Typography>
                </Box>
            </Box>
            <Stack spacing={2} direction={'row'} width={'100%'} sx={{ justifyContent: 'space-between' }}>
                <Button fullWidth variant='contained' onClick={handleStart} disabled={isStreaming}>
                    Start Streaming
                </Button>
                <Button fullWidth variant='contained' color='error' onClick={handleStop} disabled={!isStreaming}>
                    Stop Streaming
                </Button>
                <Button fullWidth variant='contained' color='primary' onClick={handleFullscreen}>
                    Fullscreen
                </Button>
            </Stack>
        </Stack>
    );
};

export default VideoFeed;