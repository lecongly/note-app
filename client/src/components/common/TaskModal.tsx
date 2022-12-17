import {Fade, IconButton, Modal, Box, TextField, Typography, Divider} from '@mui/material'
import React, {useEffect, useState} from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import Moment from 'moment'
// @ts-ignore
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {Task} from '../../types/task';
import taskApi from '../../api/taskApi';


import '../../css/custom-editor.css'

interface Props {
    selectedTask: Task | undefined
    boardId: string
    onClose: () => void
    onUpdate: (task: Task) => void
    onDelete: (task: Task) => void
}

const modalStyle = {
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 1,
    height: '80%'
}

let timer: any
const timeout = 500
let isModalClosed = false


const TaskModal = ({selectedTask, boardId, onClose, onUpdate, onDelete}: Props) => {
    const [task, setTask] = useState<Task | undefined>(selectedTask)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    useEffect(() => {
        setTask(selectedTask)
        setTitle(selectedTask !== undefined ? selectedTask.title : '')
        setContent(selectedTask !== undefined ? selectedTask.content : '')
        if (selectedTask !== undefined) {
            isModalClosed = false

        }
    }, [selectedTask])

    const onHandleClose = () => {
        isModalClosed = true
        onUpdate(task!)
        onClose()
    }

    const deleteTask = async () => {
        try {
            await taskApi.delete(boardId, task?.id as string)
            onDelete(task!)
            setTask(undefined)
        } catch (err) {
            alert(err)
        }
    }
    const updateTitle = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        clearTimeout(timer)
        const newTitle = e.target.value
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task?.id as string, {title: newTitle})
            } catch (err) {
                alert(err)
            }
        }, timeout)
        if (task) {
            task.title = newTitle
        }
        setTitle(newTitle)
        onUpdate(task!)
    }

    const updateContent = async (event: any, editor: any) => {
        clearTimeout(timer)
        const data = editor.getData()
        if (!isModalClosed) {
            timer = setTimeout(async () => {
                try {
                    await taskApi.update(boardId, task?.id as string, {content: data})
                } catch (err) {
                    alert(err)
                }
            }, timeout);
            if (task) {
                task.content = data
            }
            setContent(data)
            onUpdate(task!)
        }
    }
    return (
        <Modal
            open={task !== undefined}
            onClose={onHandleClose}
            closeAfterTransition
        >
            <Fade in={task !== undefined}>
                <Box sx={modalStyle}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}>
                        <IconButton
                            color='error'
                            onClick={deleteTask}
                        >
                            <DeleteOutlinedIcon/>
                        </IconButton>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'column',
                        padding: '2rem 5rem 5rem'
                    }}>
                        <TextField
                            value={title}
                            onChange={updateTitle}
                            placeholder='Untitled'
                            variant='outlined'
                            fullWidth
                            sx={{
                                width: '100%',
                                '& .MuiOutlinedInput-input': {padding: 0},
                                '& .MuiOutlinedInput-notchedOutline': {border: 'unset '},
                                '& .MuiOutlinedInput-root': {fontSize: '2.5rem', fontWeight: '700'},
                                marginBottom: '10px'
                            }}
                        />
                        <Typography variant='body2' fontWeight='700'>
                            {task !== undefined ? Moment(task.createdAt).format('YYYY-MM-DD') : ''}
                        </Typography>
                        <Divider sx={{margin: '1.5rem 0'}}/>
                        <Box
                            sx={{
                                position: 'relative',
                                height: '80%',
                                overflowX: 'hidden',
                                overflowY: 'auto'
                            }}
                        >
                            <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onChange={updateContent}
                            />
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default TaskModal;