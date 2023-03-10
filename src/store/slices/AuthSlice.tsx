import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

type InitialState = {
    logged: boolean
    loading: boolean
}
const initialState: InitialState = {
    logged: false,
    loading: true
}

export const loggedIn = createAsyncThunk('Checked if logged in', () => {

})

export const logInUser = createAsyncThunk('Login User', () => {

})

const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(logInUser.fulfilled, (state, action) => {
            state.loading = false;
            state.logged = true
        })
    }
})

export const {} = AuthSlice.actions

export default AuthSlice.reducer