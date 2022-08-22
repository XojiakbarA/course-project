import { createSlice } from "@reduxjs/toolkit"
import {getItemComments} from "../asyncThunk/commentsAsyncThunk";

const initialState = {
    content: [],
    single: null,
    getLoading: false,
    getSingleLoading: false,
    createLoading: false,
    editLoading: false,
    deleteLoading: false,
    deleteImageLoading: false
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments: (state, action) => {
            state.content = action.payload
        },
        setComment: (state, action) => {
            state.single = action.payload
        },
        addComment: (state, action) => {
            state.content = state.content.concat(action.payload)
        }
    },
    extraReducers: {
        [getItemComments.pending]: (state) => {
            state.getLoading = true
        },
        [getItemComments.fulfilled]: (state, action) => {
            state.getLoading = false
            state.content = action.payload
            state.error = null
        },
        [getItemComments.rejected]: (state, action) => {
            state.getLoading = false
            state.error = action.payload
        },
    }
})

export const { setComments, setComment, addComment } = commentsSlice.actions

export default commentsSlice.reducer