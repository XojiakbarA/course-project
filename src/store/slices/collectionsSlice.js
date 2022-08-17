import { createSlice } from "@reduxjs/toolkit"
import {
    createCollection,
    deleteCollection, deleteCollectionImage,
    editCollection,
    getUserCollections
} from "../asyncThunk/collectionsAsyncThunk";

const initialState = {
    content: [],
    single: null,
    getLoading: false,
    createLoading: false,
    editLoading: false,
    deleteLoading: false,
    deleteImageLoading: false
}

export const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        setCollections: (state, action) => {
            state.content = action.payload
        },
        setCollection: (state, action) => {
            state.single = action.payload
        }
    },
    extraReducers: {
        [getUserCollections.pending]: (state) => {
            state.getLoading = true
        },
        [getUserCollections.fulfilled]: (state, action) => {
            state.getLoading = false
            state.content = action.payload
            state.error = null
        },
        [getUserCollections.rejected]: (state, action) => {
            state.getLoading = false
            state.error = action.payload
        },
        [createCollection.pending]: (state) => {
            state.createLoading = true
        },
        [createCollection.fulfilled]: (state, action) => {
            state.createLoading = false
            state.content = state.content.concat(action.payload)
            state.error = null
        },
        [createCollection.rejected]: (state, action) => {
            state.createLoading = false
            state.error = action.payload
        },
        [editCollection.pending]: (state) => {
            state.editLoading = true
        },
        [editCollection.fulfilled]: (state, action) => {
            state.editLoading = false
            const i = state.content.findIndex(i => i.id === action.payload.id)
            state.content[i] = action.payload
            state.error = null
        },
        [editCollection.rejected]: (state, action) => {
            state.editLoading = false
            state.error = action.payload
        },
        [deleteCollection.pending]: (state) => {
            state.deleteLoading = true
        },
        [deleteCollection.fulfilled]: (state, action) => {
            state.deleteLoading = false
            state.content = state.content.filter(i => i.id !== action.payload)
            state.error = null
        },
        [deleteCollection.rejected]: (state, action) => {
            state.deleteLoading = false
            state.error = action.payload
        },
        [deleteCollectionImage.pending]: (state) => {
            state.deleteImageLoading = true
        },
        [deleteCollectionImage.fulfilled]: (state, action) => {
            state.deleteImageLoading = false
            const i = state.content.findIndex(i => i.id === action.payload)
            const collection = state.content.find(i => i.id === action.payload)
            state.content[i] = { ...collection, image: null }
            state.single = { ...collection, image: null }
            state.error = null
        },
        [deleteCollectionImage.rejected]: (state, action) => {
            state.deleteImageLoading = false
            state.error = action.payload
        },
    }
})

export const { setCollections, setCollection } = collectionsSlice.actions

export default collectionsSlice.reducer