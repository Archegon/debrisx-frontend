import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box mb="30px">
            <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{
                    m: "0 0 5px 0",
                    textShadow: "0.5px 0.5px 1px rgba(0, 0, 0, 0.2)",
                }}
            >
                {title}
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[500]}
                sx={{
                    textShadow: "0.5px 0.5px 0.5px rgba(0, 0, 0, 0.2)",
                }}
            >
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;