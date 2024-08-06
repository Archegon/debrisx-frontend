import React, { useRef, useState } from "react";
import { Box, Button, Stack, Typography, RadioGroup, FormControl, FormControlLabel, Radio, FormLabel } from "@mui/material";
import Header from "../../components/Header";
import VideoFeed from "../../components/VideoFeed";

const API_BASE_URL = process.env.REACT_APP_BACKEND_IP;

const Training = () => {
    const [imageType, setImageType] = useState('train');
    const [previewSrc, setPreviewSrc] = useState('');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const captureFrame = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) {
            console.error('Video or canvas element not found');
            return;
        }

        // Set the canvas dimensions
        canvas.width = 640;
        canvas.height = 480;

        const context = canvas.getContext('2d');
        if (!context) {
            console.error('Failed to get canvas context');
            return;
        }

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to Blob and handle errors
        canvas.toBlob(async (blob) => {
            if (!blob) {
                console.error('Failed to create blob from canvas');
                return;
            }

            const formData = new FormData();
            formData.append('image', blob, 'captured_frame.jpg');
            formData.append('type', imageType);

            try {
                const response = await fetch(`http://${API_BASE_URL}/api/upload`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                console.log('Image uploaded:', data);

                const url = URL.createObjectURL(blob);
                setPreviewSrc(url);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }, 'image/jpeg');
    };

    return (
        <Box>
            <Header title="Training" subtitle="Improve object detection model" />
            <Stack direction={'row'} spacing={3}>
                <VideoFeed maxWidth={450} videoRef={videoRef} raw_feed={true} />
                <Stack direction={'column'} spacing={2}>
                    <Box>
                        <Typography variant="h3">Prepare training data</Typography>
                        <Typography variant="subtitle1">Save frame of stream to use on training</Typography>
                    </Box>
                    <FormControl>
                        <FormLabel id="data-radio-buttons-group-label">Data set</FormLabel>
                        <RadioGroup
                            aria-labelledby="data-radio-buttons-group-label"
                            value={imageType}
                            onChange={(e) => setImageType(e.target.value)}
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="train" control={<Radio />} label="Train" />
                            <FormControlLabel value="validate" control={<Radio />} label="Validate" />
                            <FormControlLabel value="test" control={<Radio />} label="Test" />
                        </RadioGroup>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={captureFrame}>Save Frame</Button>
                    {previewSrc && (
                        <Box mt={2}>
                            <Typography variant="h6">Preview:</Typography>
                            <img src={previewSrc} alt="Captured Frame" style={{ maxWidth: 250 }} />
                        </Box>
                    )}
                </Stack>
            </Stack>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </Box>
    );
}

export default Training;