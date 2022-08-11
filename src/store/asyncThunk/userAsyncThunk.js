import {createAsyncThunk} from "@reduxjs/toolkit";
import {authLogin, authRegister} from "../../api/auth";
import {setSnackbar} from "../slices/snackbarSlice";
import {toggleAuth, toggleAuthForm} from "../slices/dialogsSlice";

export const login = createAsyncThunk("auth/login",
    async ({ data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await authLogin(data)
            if (res.status === 200) {
                localStorage.setItem("token", JSON.stringify(res.data.token))
                localStorage.setItem("user", JSON.stringify(res.data.user))
                dispatch(toggleAuth())
                dispatch(setSnackbar({ data: "You are logged in!", open: true, color: "success" }))
                return res.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const register = createAsyncThunk("auth/register",
    async ({ data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await authRegister(data)
            if (res.status === 201) {
                dispatch(toggleAuthForm())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)