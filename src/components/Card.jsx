import { Box, Stack, Typography, useTheme, Button } from '@mui/material';
import { tokens } from '../theme';

const Card = ({ title, description, children }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            borderRadius={3}
            sx={{
                px: 2,
                py: 2,
                backgroundColor: colors.background[900],
            }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Stack direction="column">
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="subtitle1">{description}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} display={'block'}>
                    <Button variant="contained" color="primary">Start</Button>
                    <Button variant="contained" color="error">Stop</Button>
                </Stack>
            </Stack>
            <Box pt={2}>
                {children}
            </Box>
        </Box>
    );
}

export default Card;