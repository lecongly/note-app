import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User} from '../../types/user'

interface UserState {
    value: User
}

const initialState: UserState = {
    value: {
        id: "",
        username: ""
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.value = action.payload
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer