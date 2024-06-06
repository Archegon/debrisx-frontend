import { Box, Button, Stack, Typography, RadioGroup, FormControl, FormControlLabel, Radio, FormLabel } from "@mui/material";
import Header from "../../components/Header";
import VideoFeed from "../../components/VideoFeed";

const Training = () => {
    return (
        <Box>
            <Header title="Training" subtitle="Improve object detection model" />
            <Stack direction={'row'} spacing={3}>
                <VideoFeed maxWidth={450} />
                <Stack direction={'column'} spacing={2}>
                    {/* Add training controls here */}
                    <Box>
                        <Typography variant="h3">Prepare training data</Typography>
                        <Typography variant="subtitle1">Save frame of stream to use on training</Typography>
                    </Box>
                    <FormControl>
                        <FormLabel id="data-radio-buttons-group-label">Data set</FormLabel>
                        <RadioGroup
                            aria-labelledby="data-radio-buttons-group-label"
                            defaultValue="train"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="train" control={<Radio />} label="Train" />
                            <FormControlLabel value="validate" control={<Radio />} label="Validate" />
                            <FormControlLabel value="test" control={<Radio />} label="Test" />
                        </RadioGroup>
                    </FormControl>
                    <Button variant="contained" color="primary">Save Frame</Button>
                </Stack>
            </Stack>
        </Box>
    );
}

export default Training;