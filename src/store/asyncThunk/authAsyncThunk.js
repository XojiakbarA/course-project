import {createAsyncThunk} from "@reduxjs/toolkit";
import {authGetUser, authLogin, authRegister} from "../../api/auth";
import {setSnackbar} from "../slices/snackbarSlice";
import {toggleAuth, toggleAuthForm} from "../slices/dialogsSlice";
import {destroyUserImage, updateUser, updateUserImage} from "../../api/users";

export const getUser = createAsyncThunk("auth/get",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await authGetUser()
            if (res.status === 200) {
                return res.data
            }
        } catch ({response}) {
            return rejectWithValue(response.data.message)
        }
    }
)

export const login = createAsyncThunk("auth/login",
    async ({ data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await authLogin(data)
            if (res.status === 200) {
                dispatch(toggleAuth())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const register = createAsyncThunk("auth/register",
    async ({ data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await authRegister(data)
            if (res.status === 201) {
                dispatch(toggleAuthForm())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const editUser = createAsyncThunk("auth/edit",
    async ({ id, data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await updateUser(id, data)
            if (res.status === 200) {
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data.content
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const editUserImage = createAsyncThunk("auth/editImage",
    async ({ userId, imageId, data, setEditOpen }, { dispatch, rejectWithValue }) => {
        try {
            const res = await updateUserImage(userId, data)
            if (res.status === 200) {
                setEditOpen(false)
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data.content
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const deleteUserImage = createAsyncThunk("auth/deleteImage",
    async ({ userId, setDeleteOpen }, { dispatch, rejectWithValue }) => {
        try {
            const res = await destroyUserImage(userId)
            if (res.status === 200) {
                setDeleteOpen(false)
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)