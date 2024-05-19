import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box mb="30px">
            <Typography
                variant="h2"
                fontWeight="bold"
            >
                {title}
            </Typography>
            <Typography variant="h5" color={colors.accent[500]} >
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;