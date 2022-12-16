import React from 'react';
import {Box, ListItem, Typography} from '@mui/material';

const FavouriteList = () => {
    return (
        <ListItem>
            <Box sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography variant='body2' fontWeight='700'>
                    Favourite
                </Typography>
            </Box>
        </ListItem>
    );
};

export default FavouriteList;