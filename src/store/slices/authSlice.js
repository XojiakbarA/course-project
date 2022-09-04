import {createSlice} from "@reduxjs/toolkit"
import {getUser, login} from "../asyncThunk/authAsyncThunk";
import {decodeToken, isExpired} from "react-jwt";

const initialState = {
    user: null,
    isAuth: !isExpired(localStorage.getItem("token")),
    isAdmin: !!decodeToken(localStorage.getItem("token"))?.roles?.find(r => r.authority === "ADMIN"),
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
            state.isAdmin = false
        },
        oAuth2Login: (state, action) => {
            localStorage.setItem("token", action.payload.token)
            state.isAuth = true
            state.isAdmin = !!decodeToken(action.payload.token)?.roles?.find(r => r.authority === "ADMIN")
        },
        setAuthUser: (state, action) => {
            state.user = action.payload
            state.isAdmin = !!action.payload?.roles?.find(r => r.name === "ADMIN")
        }
    },
    extraReducers: {
        [getUser.pending]: (state) => {
            state.getLoading = true
        },
        [getUser.fulfilled]: (state, action) => {
            state.getLoading = false
            state.isAuth = true
            state.isAdmin = !!action.payload?.roles?.find(r => r.name === "ADMIN")
            state.user = action.payload
        },
        [getUser.rejected]: (state) => {
            state.getLoading = false
            state.isAuth = false
            state.isAdmin = false
            localStorage.removeItem("token")
        },
        [login.pending]: (state) => {
            state.authLoading = true
        },
        [login.fulfilled]: (state, action) => {
            state.authLoading = false
            localStorage.setItem("token", action.payload.token)
            state.isAuth = true
            state.isAdmin = !!action.payload?.user?.roles?.find(r => r.name === "ADMIN")
            state.user = action.payload.user
        },
        [login.rejected]: (state) => {
            state.authLoading = false
            state.isAuth = false
            state.isAdmin = false
            localStorage.removeItem("token")
        },
    }
})

export const { logout, oAuth2Login, setAuthUser } = authSlice.actions

export default authSlice.reducer