import { createSlice } from "@reduxjs/toolkit"
import {createComment, deleteComment, editComment, getComments, getItemComments} from "../asyncThunk/commentsAsyncThunk";

const initialState = {
    content: [],
    single: null,
    hasMore: true,
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
        [getComments.pending]: (state) => {
            state.getLoading = true
        },
        [getComments.fulfilled]: (state, action) => {
            state.hasMore = !action.payload.last
            state.content.push(...action.payload.data)
            state.getLoading = false
        },
        [getComments.rejected]: (state) => {
            state.getLoading = false
        },
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
        [createComment.pending]: (state) => {
            state.createLoading = true
        },
        [createComment.fulfilled]: (state, action) => {
            if (state.hasMore) {
                state.content.pop()
            }
            state.content.unshift(action.payload)
            state.createLoading = false
        },
        [createComment.rejected]: (state) => {
            state.createLoading = false
        },
        [editComment.pending]: (state) => {
            state.editLoading = true
        },
        [editComment.fulfilled]: (state, action) => {
            const i = state.content.findIndex(i => i.id === action.payload.id)
            state.content[i] = action.payload
            state.single = action.payload
            state.editLoading = false
        },
        [editComment.rejected]: (state) => {
            state.editLoading = false
        },
        [deleteComment.pending]: (state) => {
            state.deleteLoading = true
        },
        [deleteComment.fulfilled]: (state, action) => {
            state.content = state.content.filter(i => i.id !== action.payload.id)
            if (action.payload.lastComment) {
                state.content.push(action.payload.lastComment)
            }
            state.single = null
            state.deleteLoading = false
        },
        [deleteComment.rejected]: (state) => {
            state.deleteLoading = false
        },
    }
})

export const { setComments, setComment, addComment } = commentsSlice.actions

export default commentsSlice.reducer