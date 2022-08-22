import {createAsyncThunk} from "@reduxjs/toolkit";
import {setSnackbar} from "../slices/snackbarSlice";
import {fetchItemComments} from "../../api/items";

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