import { createSlice } from "@reduxjs/toolkit"
import {
    createCollection,
    deleteCollection, deleteCollectionImage,
    editCollection, getCollection, getCollections,
    getUserCollections
} from "../asyncThunk/collectionsAsyncThunk";

const initialState = {
    content: [],
    single: null,
    hasMore: true,
    fetchType: null,
    getLoading: false,
    getSingleLoading: false,
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
        },
        setFetchCollectionsType: (state, action) => {
            state.fetchType = action.payload
        }
    },
    extraReducers: {
        [getCollections.pending]: (state) => {
            state.getLoading = true
        },
        [getCollections.fulfilled]: (state, action) => {
            state.hasMore = !action.payload.last
            state.content.push(...action.payload.data)
            state.getLoading = false
        },
        [getCollections.rejected]: (state, action) => {
            state.getLoading = false
            state.error = action.payload
        },
        [getUserCollections.pending]: (state) => {
            state.getLoading = true
        },
        [getUserCollections.fulfilled]: (state, action) => {
            state.hasMore = !action.payload.last
            state.content.push(...action.payload.data)
            state.getLoading = false
        },
        [getUserCollections.rejected]: (state, action) => {
            state.getLoading = false
            state.error = action.payload
        },
        [getCollection.pending]: (state) => {
            state.getSingleLoading = true
        },
        [getCollection.fulfilled]: (state, action) => {
            state.getSingleLoading = false
            state.single = action.payload
            state.error = null
        },
        [getCollection.rejected]: (state, action) => {
            state.getSingleLoading = false
            state.error = action.payload
        },
        [createCollection.pending]: (state) => {
            state.createLoading = true
        },
        [createCollection.fulfilled]: (state, action) => {
            if (state.hasMore) {
                state.content.pop()
            }
            state.content.unshift(action.payload)
            state.createLoading = false
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
            state.single = action.payload
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
            state.content = state.content.filter(i => i.id !== action.payload.id)
            if (action.payload.lastCollection) {
                state.content.push(action.payload.lastCollection)
            }
            state.single = null
            state.fetchType = null
            state.deleteLoading = false
        },
        [deleteCollection.rejected]: (state, action) => {
            state.deleteLoading = false
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

export const { setCollections, setCollection, setFetchCollectionsType } = collectionsSlice.actions

export default collectionsSlice.reducer