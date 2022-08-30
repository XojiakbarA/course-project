import { createSlice } from "@reduxjs/toolkit"
import {createTag, deleteTag, editTag, getTag, getTags} from "../asyncThunk/tagsAsyncThunk";

const initialState = {
    content: [],
    single: null,
    hasMore: true,
    getLoading: false,
    getSingleLoading: false,
    createLoading: false,
    editLoading: false,
    deleteLoading: false,
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
            state.hasMore = !action.payload.last
            state.content.push(...action.payload.data)
            state.getLoading = false
        },
        [getTags.rejected]: (state, action) => {
            state.getLoading = false
        },
        [getTag.pending]: (state) => {
            state.getSingleLoading = true
        },
        [getTag.fulfilled]: (state, action) => {
            state.getSingleLoading = false
            state.single = action.payload
        },
        [getTag.rejected]: (state, action) => {
            state.getSingleLoading = false
        },
        [createTag.pending]: (state) => {
            state.createLoading = true
        },
        [createTag.fulfilled]: (state, action) => {
            if (state.hasMore) {
                state.content.pop()
            }
            state.content.unshift(action.payload)
            state.createLoading = false
        },
        [createTag.rejected]: (state) => {
            state.createLoading = false
        },
        [editTag.pending]: (state) => {
            state.editLoading = true
        },
        [editTag.fulfilled]: (state, action) => {
            const i = state.content.findIndex(i => i.id === action.payload.id)
            state.content[i] = action.payload
            state.single = action.payload
            state.editLoading = false
        },
        [editTag.rejected]: (state, action) => {
            state.editLoading = false
        },
        [deleteTag.pending]: (state) => {
            state.deleteLoading = true
        },
        [deleteTag.fulfilled]: (state, action) => {
            state.content = state.content.filter(i => i.id !== action.payload.id)
            if (action.payload.lastTag) {
                state.content.push(action.payload.lastTag)
            }
            state.single = null
            state.deleteLoading = false
        },
        [deleteTag.rejected]: (state) => {
            state.deleteLoading = false
        },
    }
})

export const { setTags, setTag } = tagsSlice.actions

export default tagsSlice.reducer