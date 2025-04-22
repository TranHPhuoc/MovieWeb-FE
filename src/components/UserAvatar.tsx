import React, { useState } from 'react';
import { Avatar, Box, Typography, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import noAvatar from '../assets/Images/noAvatar.jpg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';

const UserAvatar: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    const handleFavoriteClick = () => {
        navigate('/movies-favourite');
        handleClose();
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box 
                onClick={handleClick}
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.8 }
                }}
            >

                <Avatar 
                    src={user?.photoURL || noAvatar} 
                    alt={user?.displayName || 'User'}
                    sx={{ width: 40, height: 40 }}
                />
                <KeyboardArrowDownIcon sx={{ color: 'white', ml: 0.5 }} />
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    sx: {
                        backgroundColor: '#1a1a1a',
                        color: 'white',
                        width: 200,
                        mt: 1
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ px: 2, py: 1, borderBottom: '1px solid #333' }}>
                    <Typography>Chào,</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>{user?.displayName || 'User'}</Typography>
                </Box>
                <MenuItem onClick={handleFavoriteClick} sx={{ color: 'white' }}>
                    <ListItemIcon>
                        <FavoriteIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    Yêu thích
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: 'white', borderTop: '1px solid #333' }}>
                    <ListItemIcon>
                        <LogoutIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    Thoát
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserAvatar; 