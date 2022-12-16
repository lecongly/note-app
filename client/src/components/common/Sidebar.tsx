import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Box, Drawer, IconButton, List, ListItem, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import FavouriteList from './FavouriteList';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.value)

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const sidebarWidth = 250
    return (
        <Drawer
            container={window.document.body}
            variant="permanent"
            open={true}
            sx={{
                width: sidebarWidth,
                height: '100%',
                '& > div': {borderRight: 'none'}
            }}
        >
            <List
                disablePadding
                sx={{
                    width: sidebarWidth,
                    height: '100vh',
                    backgroundColor: '#292929'
                }}
            >
                <ListItem>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant='body2' fontWeight='700'>
                            {user.username}
                        </Typography>
                        <IconButton onClick={logout}>
                            <LogoutOutlinedIcon fontSize='small'/>
                        </IconButton>
                    </Box>
                </ListItem>
                <Box sx={{paddingTop: '10px'}}/>
                <FavouriteList/>
                <Box sx={{paddingTop: '10px'}}/>
                <ListItem>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Typography variant='body2' fontWeight='700'>
                            Private
                        </Typography>
                        <IconButton>
                            <AddBoxOutlinedIcon fontSize='small'/>
                        </IconButton>
                    </Box>
                </ListItem>
            </List>

        </Drawer>
    );
};

export default Sidebar;
