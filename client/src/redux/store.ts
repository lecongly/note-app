import {configureStore} from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'
import userReducer from './features/userSlice'
import boardReducer from './features/boardSlice'
import favouriteReducer from './features/favouriteSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        board: boardReducer,
        favourites: favouriteReducer
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export default store