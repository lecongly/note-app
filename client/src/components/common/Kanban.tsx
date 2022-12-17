import React from 'react';
import {Box, Button, Typography, Divider, TextField, IconButton, Card} from '@mui/material'
import {useEffect, useState} from 'react'

interface Props {
    boardId: string,
    sections: any
}

const Kanban = ({boardId, sections}: Props) => {
    const [data, setData] = useState([])
    
    useEffect(() => {
        setData(sections)
    }, [sections])

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Button
                    // onClick={createSection}
                >
                    Add section
                </Button>
                <Typography variant='body2' fontWeight='700'>
                    {data.length} Sections
                </Typography>
            </Box>
            <Divider sx={{margin: '10px 0'}}/>

        </>
    );
};

export default Kanban;