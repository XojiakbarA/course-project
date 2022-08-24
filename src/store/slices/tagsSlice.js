import { createSlice } from "@reduxjs/toolkit"
import {getTag, getTags} from "../asyncThunk/tagsAsyncThunk";

const initialState = {
    content: [],
    single: null,
    getLoading: false,
    getSingleLoading: false,
}

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setTags: (state, action) => {
            state.content = action.payload
        },
        setTag: (state, action) => {
            state.single = action.payload
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
        [getTag.pending]: (state) => {
            state.getSingleLoading = true
        },
        [getTag.fulfilled]: (state, action) => {
            state.getSingleLoading = false
            state.single = action.payload
            state.error = null
        },
        [getTag.rejected]: (state, action) => {
            state.getSingleLoading = false
            state.error = action.payload
        },
    }
})

export const { setTags, setTag } = tagsSlice.actions

export default tagsSlice.reducer