import {createAsyncThunk} from "@reduxjs/toolkit";
import {setSnackbar} from "../slices/snackbarSlice";
import {fetchRoles} from "../../api/roles";

export const getRoles = createAsyncThunk("roles/get",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchRoles()
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)