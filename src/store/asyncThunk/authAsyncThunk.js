import {createAsyncThunk} from "@reduxjs/toolkit";
import {authGetUser, authLogin} from "../../api/auth";
import {setSnackbar} from "../slices/snackbarSlice";
import {toggleLoginUser} from "../slices/dialogsSlice";

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
                dispatch(toggleLoginUser())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)