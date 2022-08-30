import {createAsyncThunk} from "@reduxjs/toolkit";
import {destroyUser, destroyUserImage, fetchUsers, storeUser, updateUser} from "../../api/users";
import {setSnackbar} from "../slices/snackbarSlice";
import {toggleCreateUser, toggleDeleteUser, toggleDeleteUserImage, toggleEditUser} from "../slices/dialogsSlice";
import {logout, setAuthUser} from "../slices/authSlice";

export const getUsers = createAsyncThunk("users/get",
    async ({ params }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchUsers(params)
            if (res.status === 200) {
                return res.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const createUser = createAsyncThunk("users/create",
    async ({ data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await storeUser(data)
            if (res.status === 201) {
                dispatch(toggleCreateUser())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const editUser = createAsyncThunk("users/edit",
    async ({ id, data }, { dispatch, rejectWithValue , getState }) => {
        try {
            const res = await updateUser(id, data)
            if (res.status === 200) {
                const authUser = getState().auth.user
                if (authUser.id === id) {
                    if (!res.data.data.isNonLocked) {
                        console.log(data.isNonLocked)
                        dispatch(logout())
                    } else {
                        dispatch(setAuthUser(res.data.data))
                    }
                }
                dispatch(toggleEditUser())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const deleteUser = createAsyncThunk("users/delete",
    async ({ id, params }, { dispatch, rejectWithValue }) => {
        try {
            const res = await destroyUser(id)
            if (res.status === 200) {
                dispatch(toggleDeleteUser())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                const page = await fetchUsers(params)
                if (page.status === 200) {
                    if (!page.data.last) {
                        const lastUser = page.data.data[page.data.data.length - 1]
                        return { id, lastUser }
                    }
                }
                return { id }
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const deleteUserImage = createAsyncThunk("users/deleteImage",
    async ({ id }, { dispatch, rejectWithValue, getState }) => {
        try {
            const res = await destroyUserImage(id)
            if (res.status === 200) {
                const authUser = getState().auth.user
                if (authUser.id === id) {
                    dispatch(setAuthUser({ ...authUser, image: null }))
                }
                dispatch(toggleDeleteUserImage())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return id
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)