import { createSlice } from "@reduxjs/toolkit"
import {getTags} from "../asyncThunk/tagsAsyncThunk";

const initialState = {
    content: [],
    getLoading: false
}

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setTags: (state, action) => {
            state.content = action.payload
        }
    },
    extraReducers: {
        [getTags.pending]: (state) => {
            state.getLoading = true
        },
        [getTags.fulfilled]: (state, action) => {
            state.getLoading = false
            state.content = action.payload
            state.error = null
        },
        [getTags.rejected]: (state, action) => {
            state.getLoading = false
            state.error = action.payload
        },
    }
})

export const { setTags } = tagsSlice.actions

export default tagsSlice.reducer