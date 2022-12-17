import React from 'react';
import {Box, Button, Typography, Divider, TextField, IconButton, Card} from '@mui/material'
import {useEffect, useState} from 'react'
import sectionApi from '../../api/sectionApi';
import {Section} from '../../types/section';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import taskApi from '../../api/taskApi';
import {Task} from '../../types/task';
import TaskModal from './TaskModal';

interface Props {
    boardId: string,
    sections: any
}

let timer: any
const timeout = 500

const Kanban = ({boardId, sections}: Props) => {
    const [data, setData] = useState<Section[]>([])
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined)
    useEffect(() => {
        setData(sections)
    }, [sections])

    const createSection = async () => {
        try {
            const section = await sectionApi.create(boardId)
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
        const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
        const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)
        const sourceCol = data[sourceColIndex]
        const destinationCol = data[destinationColIndex]

        const sourceSectionId = sourceCol.id
        const destinationSectionId = destinationCol.id

        const sourceTasks = [...sourceCol.tasks]
        const destinationTasks = [...destinationCol.tasks]

        if (source.droppableId !== destination.droppableId) {
            const [removed] = sourceTasks.splice(source.index, 1)
            destinationTasks.splice(destination.index, 0, removed)
            data[sourceColIndex].tasks = sourceTasks
            data[destinationColIndex].tasks = destinationTasks
            //Update new position for data
            for (const sourceTasksKey in sourceTasks) {
                sourceTasks[sourceTasksKey].position = +sourceTasksKey
            }
            for (const destinationTasksKey in destinationTasks) {
                destinationTasks[destinationTasksKey].position = +destinationTasksKey
            }
            //update section for this task
            destinationTasks[destination.index].section = {...destinationCol, tasks: []}
        } else {
            const [removed] = destinationTasks.splice(source.index, 1)
            destinationTasks.splice(destination.index, 0, removed)
            data[destinationColIndex].tasks = destinationTasks

            //Update new position for data
            for (let destinationTasksKey in destinationTasks) {
                destinationTasks[destinationTasksKey].position = +destinationTasksKey
            }

        }
        try {
            await taskApi.updatePosition(boardId, {
                resourceList: sourceTasks,
                destinationList: destinationTasks,
                resourceSectionId: sourceSectionId,
                destinationSectionId: destinationSectionId
            })
            setData(data)
        } catch (err) {
            alert(err)
        }
    }

    const createTask = async (sectionId: string) => {
        try {
            const task = await taskApi.create(boardId, {sectionId})
            const newData = [...data]
            const index = newData.findIndex(e => e.id === sectionId)
            newData[index].tasks.unshift(task)
            setData(newData)
        } catch (err) {
            alert(err)
        }
    }
    const onUpdateTask = (task: Task) => {
        const newData = [...data]
        const sectionIndex = newData.findIndex(e => e.id === task.section.id)
        const taskIndex = newData[sectionIndex].tasks.findIndex(e => e.id === task.id)
        newData[sectionIndex].tasks[taskIndex] = task
        setData(newData)
    }
    const onDeleteTask = (task: Task) => {
        const newData = [...data]
        const sectionIndex = newData.findIndex(e => e.id === task.section.id)
        const taskIndex = newData[sectionIndex].tasks.findIndex(e => e.id === task.id)
        newData[sectionIndex].tasks.splice(taskIndex, 1)
        setData(newData)
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
                                                    onClick={() => createTask(section.id)}
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
                                            {
                                                section.tasks.map((task, index) => (
                                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <Card
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                sx={{
                                                                    padding: '10px',
                                                                    marginBottom: '10px',
                                                                    cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                                                                }}
                                                                onClick={() => setSelectedTask(task)}
                                                            >
                                                                <Typography>
                                                                    {task.title === '' ? 'Untitled' : task.title}
                                                                </Typography>
                                                            </Card>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}
                                        </Box>
                                    )}
                                </Droppable>
                            </div>
                        ))
                    }
                </Box>
            </DragDropContext>
            <TaskModal
                selectedTask={selectedTask}
                boardId={boardId}
                onClose={() => setSelectedTask(undefined)}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
            />
        </>
    );
};

export default Kanban;