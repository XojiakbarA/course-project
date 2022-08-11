import {createSlice} from "@reduxjs/toolkit"
import {login, register} from "../asyncThunk/userAsyncThunk";

const initialState = {
    token: JSON.parse(localStorage.getItem("token")),
    user: JSON.parse(localStorage.getItem("user")),
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
            localStorage.removeItem("user")
            state.token = null
            state.user = null
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.authLoading = true
        },
        [login.fulfilled]: (state, action) => {
            state.authLoading = false
            state.token = action.payload.token
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