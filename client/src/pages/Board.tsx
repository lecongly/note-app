import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import boardApi from '../api/boardApi';
import {RootState, useAppDispatch} from '../redux/store';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import {Box, IconButton, TextField} from '@mui/material'
import Kanban from '../components/common/Kanban';
import EmojiPicker from '../components/common/EmojiPicker';
import {setBoards} from '../redux/features/boardSlice';

let timer: any
const timeout = 500

const Board = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const boardId = useParams().boardId as string
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [sections, setSections] = useState([])
    const [isFavourite, setIsFavourite] = useState(false)
    const [icon, setIcon] = useState('')

    const boards = useSelector((state: RootState) => state.board.value)

    useEffect(() => {
        const getBoard = async () => {
            try {
                const res = await boardApi.getOne(boardId)
                setTitle(res.title)
                setDescription(res.description)
                setSections(res.sections)
                setIsFavourite(res.favourite)
                setIcon(res.icon)
            } catch (err) {
                alert(err)
            }
        }
        getBoard()
    }, [boardId])

    const onIconChange = async (newIcon: string) => {
        let temp = [...boards]
        const index = temp.findIndex(e => e.id === boardId)
        temp[index] = {...temp[index], icon: newIcon}
        setIcon(newIcon)
        dispatch((setBoards(temp)))
        try {
            await boardApi.update(boardId, {icon: newIcon})
        } catch (e) {
            alert(e)
        }
    }
    const updateTitle = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        clearTimeout(timer)
        const newTitle = e.target.value
        setTitle(newTitle)
        let temp = [...boards]
        const index = temp.findIndex(e => e.id === boardId)
        temp[index] = {...temp[index], title: newTitle}
        dispatch(setBoards(temp))
        timer = setTimeout(async () => {
            try {
                await boardApi.update(boardId, {title: newTitle})
            } catch (err) {
                alert(err)
            }
        }, timeout);
    }
    const updateDescription = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        clearTimeout(timer)
        const newDescription = e.target.value
        setDescription(newDescription)
        timer = setTimeout(async () => {
            try {
                await boardApi.update(boardId, {description: newDescription})
            } catch (err) {
                alert(err)
            }
        }, timeout);
    }

    const addFavourite = async () => {
        try {
            const board = await boardApi.update(boardId, {favourite: !isFavourite})
            setIsFavourite(!isFavourite)
        } catch (err) {
            alert(err)
        }
    }


    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <IconButton
                    onClick={addFavourite}
                >
                    {
                        isFavourite ? (
                            <StarOutlinedIcon color='warning'/>
                        ) : (
                            <StarBorderOutlinedIcon/>
                        )
                    }
                </IconButton>

                <IconButton
                    color='error'
                    // onClick={deleteBoard}
                >
                    <DeleteOutlinedIcon/>
                </IconButton>
            </Box>
            <Box sx={{padding: '10px 50px'}}>
                <Box>
                    {/* emoji picker */}
                    <EmojiPicker
                        icon={icon}
                        onChange={onIconChange}
                    />
                    <TextField
                        value={title}
                        onChange={updateTitle}
                        placeholder='Untitled'
                        variant='outlined'
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-input': {padding: 0},
                            '& .MuiOutlinedInput-notchedOutline': {border: 'unset '},
                            '& .MuiOutlinedInput-root': {fontSize: '2rem', fontWeight: '700'}
                        }}
                    />
                    <TextField
                        value={description}
                        onChange={updateDescription}
                        placeholder='Add a description'
                        variant='outlined'
                        multiline
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-input': {padding: 0},
                            '& .MuiOutlinedInput-notchedOutline': {border: 'unset '},
                            '& .MuiOutlinedInput-root': {fontSize: '0.8rem'}
                        }}
                    />
                </Box>
                <Box>
                    {/* Kanban board */}
                    <Kanban sections={sections} boardId={boardId}/>
                </Box>
            </Box>
        </>
    );
};

export default Board;