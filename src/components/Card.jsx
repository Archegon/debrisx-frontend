import { Box, Stack, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';

const Card = ({ title, description, children }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            borderRadius={3}
            height={'100%'}
            width={'100%'}
            sx={{
                px: 2,
                py: 2,
                backgroundColor: colors.background[900],
                position: 'relative', // Ensures the child elements are positioned relative to this container
            }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Stack direction="column">
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="subtitle1">{description}</Typography>
                </Stack>
            </Stack>
            <Box
                className="no-drag"
                pt={2}
                width={"100%"}
                height={"100%"}
                maxHeight={"calc(100% - 48px)"}
                overflow={'auto'}
            >
                {children}
            </Box>
        </Box>
    );
}

export default Card;