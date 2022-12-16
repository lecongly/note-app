import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface Board {
    user: string;
    icon: string;
    title: string;
    description: string;
    position: number;
    favourite: boolean;
    favouritePosition: number;
    id: string;
}

interface BoardState {
    value: Board[];
}

const initialState: BoardState = {
    value: [],
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoards: (state, action: PayloadAction<Board[]>) => {
            state.value = action.payload
        }
    }
})

export const {setBoards} = boardSlice.actions

export default boardSlice.reducer