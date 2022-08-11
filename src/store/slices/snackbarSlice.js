import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: "",
    open: false,
    color: "success"
}

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        setSnackbar: (state, action) => {
            state.data = action.payload.data ?? state.data
            state.open = action.payload.open ?? state.open
            state.color = action.payload.color ?? state.color
        }
    }
})

export const { setSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer