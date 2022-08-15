import {createSlice} from "@reduxjs/toolkit"
import {deleteUserImage, editUser, editUserImage, getUser, login, register} from "../asyncThunk/authAsyncThunk";
import {isExpired} from "react-jwt";

const initialState = {
    user: null,
    isAuth: !isExpired(localStorage.getItem("token")),
    error: null,
    authLoading: false,
    getLoading: false,
    editLoading: false,
    editImageLoading: false,
    deleteImageLoading: false

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
        [editUser.pending]: (state) => {
            state.editLoading = true
        },
        [editUser.fulfilled]: (state, action) => {
            state.editLoading = false
            state.user = action.payload
            state.error = null
        },
        [editUser.rejected]: (state, action) => {
            state.editLoading = false
            state.error = action.payload
        },
        [editUserImage.pending]: (state) => {
            state.editImageLoading = true
        },
        [editUserImage.fulfilled]: (state, action) => {
            state.editImageLoading = false
            state.user.image = action.payload
            state.error = null
        },
        [editUserImage.rejected]: (state, action) => {
            state.editImageLoading = false
            state.error = action.payload
        },
        [deleteUserImage.pending]: (state) => {
            state.deleteImageLoading = true
        },
        [deleteUserImage.fulfilled]: (state, action) => {
            state.deleteImageLoading = false
            state.user.image = null
            state.error = null
        },
        [deleteUserImage.rejected]: (state, action) => {
            state.deleteImageLoading = false
            state.error = action.payload
        },
    }
})

export const { logout, oAuth2Login } = authSlice.actions

export default authSlice.reducer