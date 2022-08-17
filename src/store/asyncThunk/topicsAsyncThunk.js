import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchTopics} from "../../api/topics";
import {setSnackbar} from "../slices/snackbarSlice";

export const getTopics = createAsyncThunk("topics/get",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchTopics()
            if (res.status === 200) {
                return res.data.content
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)