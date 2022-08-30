import { createSlice } from "@reduxjs/toolkit"
import {createTopic, deleteTopic, editTopic, getTopics} from "../asyncThunk/topicsAsyncThunk";

const initialState = {
    content: [],
    single: null,
    hasMore: true,
    getLoading: false,
    createLoading: false,
    editLoading: false,
    deleteLoading: false,
}

export const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        setTopics: (state, action) => {
            state.content = action.payload
        },
        setTopic: (state, action) => {
            state.single = action.payload
        }
    },
    extraReducers: {
        [getTopics.pending]: (state) => {
            state.getLoading = true
        },
        [getTopics.fulfilled]: (state, action) => {
            state.hasMore = !action.payload.last
            state.content.push(...action.payload.data)
            state.getLoading = false
        },
        [getTopics.rejected]: (state) => {
            state.getLoading = false
        },
        [createTopic.pending]: (state) => {
            state.createLoading = true
        },
        [createTopic.fulfilled]: (state, action) => {
            if (state.hasMore) {
                state.content.pop()
            }
            state.content.unshift(action.payload)
            state.createLoading = false
        },
        [createTopic.rejected]: (state) => {
            state.createLoading = false
        },
        [editTopic.pending]: (state) => {
            state.editLoading = true
        },
        [editTopic.fulfilled]: (state, action) => {
            const i = state.content.findIndex(i => i.id === action.payload.id)
            state.content[i] = action.payload
            state.single = action.payload
            state.editLoading = false
        },
        [editTopic.rejected]: (state, action) => {
            state.editLoading = false
        },
        [deleteTopic.pending]: (state) => {
            state.deleteLoading = true
        },
        [deleteTopic.fulfilled]: (state, action) => {
            state.content = state.content.filter(i => i.id !== action.payload.id)
            if (action.payload.lastTopic) {
                state.content.push(action.payload.lastTopic)
            }
            state.single = null
            state.deleteLoading = false
        },
        [deleteTopic.rejected]: (state) => {
            state.deleteLoading = false
        },
    }
})

export const { setTopics, setTopic } = topicsSlice.actions

export default topicsSlice.reducer