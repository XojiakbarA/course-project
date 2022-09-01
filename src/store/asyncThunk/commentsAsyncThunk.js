import {createAsyncThunk} from "@reduxjs/toolkit";
import {setSnackbar} from "../slices/snackbarSlice";
import {fetchItemComments} from "../../api/items";
import {destroyComment, fetchComments, storeComment, updateComment} from "../../api/comments";
import {toggleCreateComment, toggleDeleteComment, toggleEditComment} from "../slices/dialogsSlice";

export const getComments = createAsyncThunk("comments/get",
    async ({ params }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchComments(params)
            if (res.status === 200) {
                return res.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const getItemComments = createAsyncThunk("comments/itemGet",
    async ({ id }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchItemComments(id)
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const createComment = createAsyncThunk("comments/create",
    async ({ data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await storeComment(data)
            if (res.status === 201) {
                dispatch(toggleCreateComment())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const editComment = createAsyncThunk("comments/edit",
    async ({ id, data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await updateComment(id, data)
            if (res.status === 200) {
                dispatch(toggleEditComment())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const deleteComment = createAsyncThunk("comments/delete",
    async ({ id, params }, { dispatch, rejectWithValue }) => {
        try {
            const res = await destroyComment(id)
            if (res.status === 200) {
                dispatch(toggleDeleteComment())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                const page = await fetchComments(params)
                if (page.status === 200) {
                    if (!page.data.last) {
                        const lastComment = page.data.data[page.data.data.length - 1]
                        return { id, lastComment }
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