import React from 'react';
import {Box, Button, Typography, Divider, TextField, IconButton, Card} from '@mui/material'
import {useEffect, useState} from 'react'
import sectionApi from '../../api/sectionApi';
import {Section} from '../../types/section';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

interface Props {
    boardId: string,
    sections: any
}

let timer: any
const timeout = 500

const Kanban = ({boardId, sections}: Props) => {
    const [data, setData] = useState<Section[]>([])

    useEffect(() => {
        setData(sections)
    }, [sections])

    const createSection = async () => {
        try {
            const section = await sectionApi.create(boardId)
            console.log(section)
            setData([...data, section])
        } catch (e) {
            alert(e)
        }
    }
    const deleteSection = async (sectionId: string) => {
        try {
            await sectionApi.delete(boardId, sectionId)
            const newData = [...data].filter(e => e.id !== sectionId)
            setData(newData)
        } catch (e) {
            alert(e)
        }
    }
    const updateSectionTitle = async (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, sectionId: string) => {
        clearTimeout(timer)
        const newTitle = e.target.value
        const newData = [...data]
        const index = newData.findIndex(e => e.id === sectionId)
        newData[index].title = newTitle
        setData(newData)
        timer = setTimeout(async () => {
            try {
                await sectionApi.update(boardId, sectionId, {title: newTitle})
            } catch (err) {
                alert(err)
            }
        }, timeout);
    }
    const onDragEnd = async ({source, destination}: { source: any, destination: any }) => {
        if (!destination) return
    }
    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Button
                    onClick={createSection}
                >
                    Add section
                </Button>
                <Typography variant='body2' fontWeight='700'>
                    {data.length} Sections
                </Typography>
            </Box>
            <Divider sx={{margin: '10px 0'}}/>
            <DragDropContext onDragEnd={onDragEnd}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    width: 'calc(100vw - 400px)',
                    overflowX: 'auto'
                }}>
                    {
                        data.map(section => (
                            <div key={section.id} style={{width: '300px'}}>
                                <Droppable key={section.id} droppableId={section.id}>
                                    {(provided) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            sx={{width: '300px', padding: '10px', marginRight: '10px'}}
                                        >
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginBottom: '10px'
                                            }}>
                                                <TextField
                                                    value={section.title}
                                                    onChange={(e) => updateSectionTitle(e, section.id)}
                                                    placeholder='Untitled'
                                                    variant='outlined'
                                                    sx={{
                                                        flexGrow: 1,
                                                        '& .MuiOutlinedInput-input': {padding: 0},
                                                        '& .MuiOutlinedInput-notchedOutline': {border: 'unset '},
                                                        '& .MuiOutlinedInput-root': {
                                                            fontSize: '1rem',
                                                            fontWeight: '700'
                                                        }
                                                    }}
                                                />
                                                <IconButton
                                                    size='small'
                                                    sx={{
                                                        color: 'gray',
                                                        '&:hover': {color: 'green'}
                                                    }}
                                                    // onClick={() => createTask(section.id)}
                                                >
                                                    <AddOutlinedIcon/>
                                                </IconButton>
                                                <IconButton
                                                    size='small'
                                                    sx={{
                                                        color: 'gray',
                                                        '&:hover': {color: 'red'}
                                                    }}
                                                    onClick={() => deleteSection(section.id)}
                                                >
                                                    <DeleteOutlinedIcon/>
                                                </IconButton>
                                            </Box>
                                            {/* tasks */}
                                            
                                            {provided.placeholder}
                                        </Box>
                                    )}
                                </Droppable>
                            </div>
                        ))
                    }
                </Box>
            </DragDropContext>
        </>
    );
};

export default Kanban;