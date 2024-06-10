import React, { useRef, useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Button, Stack, Typography } from '@mui/material';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PREDICTED_FEED_URL = `${API_BASE_URL}/predicted_feed`;
const PREDICTED_FEED_START_URL = `${API_BASE_URL}/predicted_feed/start`;

const RAW_FEED_URL = `${API_BASE_URL}/raw_feed`;
const RAW_FEED_START_URL = `${API_BASE_URL}/raw_feed/start`;

const startPredictedFeed = async ({ raw_feed }) => {
    let url = '';

    if (raw_feed) {
        console.log("Starting raw feed");
        url = RAW_FEED_START_URL;
    } else {
        console.log("Starting predicted feed");
        url = PREDICTED_FEED_START_URL;
    }

    const response = await axios.get(url);
    return response.data;
};

const stopPredictedFeed = async () => {
    const response = await axios.get(`${API_BASE_URL}/predicted_feed/stop`);
    return response.data;
};

const VideoFeed = ({ maxWidth, videoRef, raw_feed }) => {
    const imgRef = useRef(null);
    const videoContainerRef = useRef(null);
    const [isStreaming, setIsStreaming] = useState(false);

    const startMutation = useMutation({
        mutationFn: startPredictedFeed,
        onSuccess: () => {
            if (imgRef.current) {
                if (raw_feed) {
                    imgRef.current.src = RAW_FEED_URL;
                } else {
                    imgRef.current.src = PREDICTED_FEED_URL;
                };
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
        startMutation.mutate({ raw_feed });
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

    useEffect(() => {
        if (videoRef) {
            videoRef.current = imgRef.current;
            videoRef.current.crossOrigin = "anonymous";
        }
    }, [videoRef]);

    return (
        <Stack spacing={2} direction={'column'} alignItems={'center'} maxWidth={maxWidth}>
            <Box
                ref={videoContainerRef}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '100%',
                    maxWidth: '640px',
                    height: 'auto',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                }}
            >
                <img
                    ref={imgRef}
                    src=""
                    alt="Predicted Video Feed"
                    style={{
                        position: 'absolute',
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
                        width: 'auto',
                        height: '100%',
                        aspectRatio: '1 / 1',
                        backgroundColor: 'grey',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        objectFit: 'contain',
                        zIndex: 1,
                    }}
                >
                    <Typography variant='h5' color='textSecondary'>
                        No Video Feed
                    </Typography>
                </Box>
            </Box>
            <Stack spacing={2} direction={'row'} width={'100%'} sx={{ justifyContent: 'space-between' }}>
                <Button className='no-drag' fullWidth variant='contained' onClick={handleStart} disabled={isStreaming}>
                    Start Streaming
                </Button>
                <Button className='no-drag' fullWidth variant='contained' color='error' onClick={handleStop} disabled={!isStreaming}>
                    Stop Streaming
                </Button>
                <Button className='no-drag' fullWidth variant='contained' color='primary' onClick={handleFullscreen}>
                    Fullscreen
                </Button>
            </Stack>
        </Stack>
    );
};

export default VideoFeed;