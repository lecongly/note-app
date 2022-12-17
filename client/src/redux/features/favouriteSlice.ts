import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Board} from '../../types/board';

interface FavouriteState {
    value: Board[];
}

const initialState: FavouriteState = {
    value: [],
};

export const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        setFavouriteList: (state, action: PayloadAction<Board[]>) => {
            state.value = action.payload
        }
    }
})

export const {setFavouriteList} = favouriteSlice.actions

export default favouriteSlice.reducer