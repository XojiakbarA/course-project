import { createSlice } from "@reduxjs/toolkit"
import {getTopics} from "../asyncThunk/topicsAsyncThunk";

const initialState = {
    content: [],
    getLoading: false
}

export const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        setTopics: (state, action) => {
            state.content = action.payload
        }
    },
    extraReducers: {
        [getTopics.pending]: (state) => {
            state.getLoading = true
        },
        [getTopics.fulfilled]: (state, action) => {
            state.getLoading = false
            state.content = action.payload
            state.error = null
        },
        [getTopics.rejected]: (state, action) => {
            state.getLoading = false
            state.error = action.payload
        },
    }
})

export const { setTopics } = topicsSlice.actions

export default topicsSlice.reducer