import {createSlice} from "@reduxjs/toolkit"
import {getUser, login} from "../asyncThunk/authAsyncThunk";
import {isExpired} from "react-jwt";

const initialState = {
    user: null,
    isAuth: !isExpired(localStorage.getItem("token")),
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
            state.isAuth = false
        },
        oAuth2Login: (state, action) => {
            localStorage.setItem("token", action.payload.token)
            state.isAuth = true
        },
        setAuthUser: (state, action) => {
            state.user = action.payload
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
            state.isAuth = false
            state.error = action.payload
        },
        [login.pending]: (state) => {
            state.authLoading = true
        },
        [login.fulfilled]: (state, action) => {
            state.authLoading = false
            localStorage.setItem("token", action.payload.token)
            state.isAuth = true
            state.user = action.payload.user
            state.error = null
        },
        [login.rejected]: (state, action) => {
            state.authLoading = false
            state.error = action.payload
        },
    }
})

export const { logout, oAuth2Login, setAuthUser } = authSlice.actions

export default authSlice.reducer