import {createAsyncThunk} from "@reduxjs/toolkit";
import {setSnackbar} from "../slices/snackbarSlice";
import {destroyTag, fetchTag, fetchTags, storeTag, updateTag} from "../../api/tags";
import {toggleCreateTag, toggleDeleteTag, toggleEditTag} from "../slices/dialogsSlice";

export const getTags = createAsyncThunk("tags/get",
    async ({ params }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchTags(params)
            if (res.status === 200) {
                return res.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const getTag = createAsyncThunk("tags/singleGet",
    async ({ id, navigate }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchTag(id)
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            if (response.status === 404) navigate("/")
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const createTag = createAsyncThunk("tags/create",
    async ({ data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await storeTag(data)
            if (res.status === 201) {
                dispatch(toggleCreateTag())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const editTag = createAsyncThunk("tags/edit",
    async ({ id, data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await updateTag(id, data)
            if (res.status === 200) {
                dispatch(toggleEditTag())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const deleteTag = createAsyncThunk("tags/delete",
    async ({ id, params }, { dispatch, rejectWithValue }) => {
        try {
            const res = await destroyTag(id)
            if (res.status === 200) {
                dispatch(toggleDeleteTag())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                const page = await fetchTags(params)
                if (page.status === 200) {
                    if (!page.data.last) {
                        const lastTag = page.data.data[page.data.data.length - 1]
                        return { id, lastTag }
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