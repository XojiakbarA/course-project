import {createAsyncThunk} from "@reduxjs/toolkit";
import {setSnackbar} from "../slices/snackbarSlice";
import {fetchTags} from "../../api/tags";

export const getTags = createAsyncThunk("tags/get",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchTags()
            if (res.status === 200) {
                return res.data.content
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)