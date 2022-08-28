import { createSlice } from "@reduxjs/toolkit"
import {getRoles} from "../asyncThunk/rolesAsyncThunk";

const initialState = {
    content: [],
    single: null,
    getLoading: false,
    getSingleLoading: false,
}

export const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        setRoles: (state, action) => {
            state.content = action.payload
        },
        setRole: (state, action) => {
            state.single = action.payload
        }
    },
    extraReducers: {
        [getRoles.pending]: (state) => {
            state.getLoading = true
        },
        [getRoles.fulfilled]: (state, action) => {
            state.getLoading = false
            state.content = action.payload
            state.error = null
        },
        [getRoles.rejected]: (state, action) => {
            state.getLoading = false
            state.error = action.payload
        },
    }
})

export const { setRoles, setRole } = rolesSlice.actions

export default rolesSlice.reducer