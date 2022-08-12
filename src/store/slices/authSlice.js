import {createSlice} from "@reduxjs/toolkit"
import {getUser, login, register} from "../asyncThunk/userAsyncThunk";

const initialState = {
    user: null,
    error: null,
    authLoading: false,
    getLoading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem("token")
            state.user = null
        }
    },
    extraReducers: {
        [getUser.pending]: (state) => {
            state.getLoading = true
        },
        [getUser.fulfilled]: (state, action) => {
            state.getLoading = false
            state.user = action.payload
            state.error = null
        },
        [getUser.rejected]: (state, action) => {
            state.getLoading = false
            state.error = action.payload
        },
        [login.pending]: (state) => {
            state.authLoading = true
        },
        [login.fulfilled]: (state, action) => {
            state.authLoading = false
            localStorage.setItem("token", action.payload.token)
            state.user = action.payload.user
            state.error = null
        },
        [login.rejected]: (state, action) => {
            state.authLoading = false
            state.error = action.payload
        },
        [register.pending]: (state) => {
            state.authLoading = true
        },
        [register.fulfilled]: (state, action) => {
            state.authLoading = false
            state.error = null
        },
        [register.rejected]: (state, action) => {
            state.authLoading = false
            state.error = action.payload
        },
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer