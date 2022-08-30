import {createAsyncThunk} from "@reduxjs/toolkit";
import {destroyTopic, fetchTopics, storeTopic, updateTopic} from "../../api/topics";
import {setSnackbar} from "../slices/snackbarSlice";
import {toggleCreateTopic, toggleDeleteTopic, toggleEditTopic} from "../slices/dialogsSlice";

export const getTopics = createAsyncThunk("topics/get",
    async ({ params }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchTopics(params)
            if (res.status === 200) {
                return res.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const createTopic = createAsyncThunk("topics/create",
    async ({ data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await storeTopic(data)
            if (res.status === 201) {
                dispatch(toggleCreateTopic())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const editTopic = createAsyncThunk("topics/edit",
    async ({ id, data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await updateTopic(id, data)
            if (res.status === 200) {
                dispatch(toggleEditTopic())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const deleteTopic = createAsyncThunk("topics/delete",
    async ({ id, params }, { dispatch, rejectWithValue }) => {
        try {
            const res = await destroyTopic(id)
            if (res.status === 200) {
                dispatch(toggleDeleteTopic())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                const page = await fetchTopics(params)
                if (page.status === 200) {
                    if (!page.data.last) {
                        const lastTopic = page.data.data[page.data.data.length - 1]
                        return { id, lastTopic }
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