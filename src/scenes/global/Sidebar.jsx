import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import { tokens } from '../../theme';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <ProSidebar
            backgroundColor={theme.palette.mode === "dark" ? "transparent" : colors.primary[400]}
            rootStyles={{
                border: 'None',
                background: `linear-gradient(to bottom, ${colors.primary[400]}, ${colors.primary[600]})`,
            }}
        >
            <Box px={2} pt={3}>
                <Typography align='center' fontWeight={'bold'} variant='h2'>
                    Debris <span style={{ color: 'orange' }}>X</span><br />
                    <Typography variant='subtitle1'>Control Panel</Typography>
                </Typography>
                <Divider sx={{ pt: 3 }} />
                <Menu
                    menuItemStyles={{
                        button: {
                            [`&.active`]: {
                                fontWeight: 'bold',
                                color: colors.blueAccent[500],
                            },
                            '&:hover': {
                                color: colors.blueAccent[500],
                                backgroundColor: 'transparent',
                            },
                        },
                    }}
                >
                    <MenuItem icon={<DashboardIcon />} component={<NavLink to="/" />}>Dashboard</MenuItem>
                    <MenuItem icon={<QuizIcon />} component={<NavLink to="/faq" />}>FAQ</MenuItem>
                    <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
                </Menu>
            </Box>
        </ProSidebar>
    );
}

export default Sidebar;
