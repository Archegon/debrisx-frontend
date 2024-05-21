import { NavLink } from 'react-router-dom';
import { Box, Divider, Drawer, List, ListItemIcon, ListItemText, Typography, useTheme, ListItemButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import SettingsIcon from '@mui/icons-material/Settings';
import { tokens } from '../../theme';

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 250,
                    background: colors.background[900],
                    border: 'none',
                },
            }}
        >
            <Box px={2} pt={3}>
                <Typography align='center' fontWeight={'bold'} variant='h2'>
                    Debris <span style={{ color: colors.accent[500] }}>X</span><br />
                    <Typography variant='subtitle1'>Control Panel</Typography>
                </Typography>
                <Divider sx={{ pt: 3 }} />
                <List sx={{
                    '& .MuiListItemButton-root.active': {
                        color: colors.accent[500],
                        '& .MuiListItemIcon-root': {
                            color: colors.accent[500],
                        },
                        '& .MuiTypography-root': {
                            fontWeight: 'bold',
                        },
                    },
                }}>
                    <ListItemButton component={NavLink} to="/">
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton component={NavLink} to="/faq">
                        <ListItemIcon>
                            <QuizIcon />
                        </ListItemIcon>
                        <ListItemText primary="FAQ" />
                    </ListItemButton>
                    <ListItemButton component={NavLink} to="/settings">
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    );
}

export default Sidebar;
