import {Box, Typography} from '@mui/material'
import React, {useState, useEffect} from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

// import 'emoji-mart/css/emoji-mart.css'

interface Props {
    icon: string
    onChange: (emoji: string) => void
}

const EmojiPicker = ({icon, onChange}: Props) => {
    const [selectedEmoji, setSelectedEmoji] = useState("")
    const [isShowPicker, setIsShowPicker] = useState(false)

    useEffect(() => {
        setSelectedEmoji(icon)
    }, [icon])

    const selectEmoji = (e: any) => {
        const emoji = e.native
        setIsShowPicker(false)
        onChange(emoji)
    }

    const showPicker = () => setIsShowPicker(!isShowPicker)

    return (
        <Box sx={{position: 'relative', width: 'max-content'}}>
            <Typography
                variant='h3'
                fontWeight='700'
                sx={{cursor: 'pointer'}}
                onClick={showPicker}
            >
                {selectedEmoji}
            </Typography>
            <Box sx={{
                display: isShowPicker ? 'block' : 'none',
                position: 'absolute',
                top: '100%',
                zIndex: '9999'
            }}>
                <Picker data={data} onEmojiSelect={selectEmoji}/>
                {/*<Picker*/}
                {/*    theme='dark'*/}
                {/*    // onSelect={selectEmoji}*/}
                {/*    showPreview={false}*/}
                {/*/>*/}
            </Box>
        </Box>
    );
};

export default EmojiPicker;