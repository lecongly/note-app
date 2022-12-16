import {createSlice} from '@reduxjs/toolkit'

interface UserValues {
    id: string
    username: string
}

const value: UserValues = {
    id: "",
    username: ""
}
const initialState = {value}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer