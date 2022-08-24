import {createAsyncThunk} from "@reduxjs/toolkit";
import {setSnackbar} from "../slices/snackbarSlice";
import {fetchTag, fetchTags} from "../../api/tags";

export const getTags = createAsyncThunk("tags/get",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchTags()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const getTag = createAsyncThunk("tags/singleGet",
    async ({ id }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchTag(id)
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)