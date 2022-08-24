import { createSlice } from "@reduxjs/toolkit"
import {
    createItem,
    deleteItem,
    deleteItemImage,
    editItem, editItemLikes,
    getCollectionItems, getItem,
    getItems, getTagItems
} from "../asyncThunk/itemsAsyncThunk";

const initialState = {
    content: [],
    single: null,
    getLoading: false,
    getSingleLoading: false,
    createLoading: false,
    editLoading: false,
    deleteLoading: false,
    deleteImageLoading: false,
    likeLoading: false
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.content = action.payload
        },
        setItem: (state, action) => {
            state.single = action.payload
        }
    },
    extraReducers: {
        [getItems.pending]: (state) => {
            state.getLoading = true
        },
        [getItems.fulfilled]: (state, action) => {
            state.getLoading = false
            state.content.push(...action.payload)
            state.error = null
        },
        [getItems.rejected]: (state, action) => {
            state.getLoading = false
            state.error = action.payload
        },
        [getCollectionItems.pending]: (state) => {
            state.getLoading = true
        },
        [getCollectionItems.fulfilled]: (state, action) => {
            state.getLoading = false
            state.content = action.payload
            state.error = null
        },
        [getCollectionItems.rejected]: (state, action) => {
            state.getLoading = false
            state.error = action.payload
        },
        [getTagItems.pending]: (state) => {
            state.getLoading = true
        },
        [getTagItems.fulfilled]: (state, action) => {
            state.getLoading = false
            state.content.push(...action.payload)
            state.error = null
        },
        [getTagItems.rejected]: (state, action) => {
            state.getLoading = false
            state.error = action.payload
        },
        [getItem.pending]: (state) => {
            state.getSingleLoading = true
        },
        [getItem.fulfilled]: (state, action) => {
            state.getSingleLoading = false
            state.single = action.payload
            state.error = null
        },
        [getItem.rejected]: (state, action) => {
            state.getSingleLoading = false
            state.error = action.payload
        },
        [createItem.pending]: (state) => {
            state.createLoading = true
        },
        [createItem.fulfilled]: (state, action) => {
            state.createLoading = false
            state.content = state.content.concat(action.payload)
            state.error = null
        },
        [createItem.rejected]: (state, action) => {
            state.createLoading = false
            state.error = action.payload
        },
        [editItem.pending]: (state) => {
            state.editLoading = true
        },
        [editItem.fulfilled]: (state, action) => {
            state.editLoading = false
            const i = state.content.findIndex(i => i.id === action.payload.id)
            state.content[i] = action.payload
            state.single = action.payload
            state.error = null
        },
        [editItem.rejected]: (state, action) => {
            state.editLoading = false
            state.error = action.payload
        },
        [deleteItem.pending]: (state) => {
            state.deleteLoading = true
        },
        [deleteItem.fulfilled]: (state, action) => {
            state.deleteLoading = false
            state.content = state.content.filter(i => i.id !== action.payload)
            state.single = null
            state.error = null
        },
        [deleteItem.rejected]: (state, action) => {
            state.deleteLoading = false
            state.error = action.payload
        },
        [deleteItemImage.pending]: (state) => {
            state.deleteImageLoading = true
        },
        [deleteItemImage.fulfilled]: (state, action) => {
            state.deleteImageLoading = false
            const i = state.content.findIndex(i => i.id === action.payload)
            const item = state.content.find(i => i.id === action.payload)
            state.content[i] = { ...item, image: null }
            state.single = { ...item, image: null }
            state.error = null
        },
        [deleteItemImage.rejected]: (state, action) => {
            state.deleteImageLoading = false
            state.error = action.payload
        },
        [editItemLikes.pending]: (state) => {
            state.likeLoading = true
        },
        [editItemLikes.fulfilled]: (state, action) => {
            state.likeLoading = false
            const i = state.content.findIndex(i => i.id === action.payload.id)
            state.content[i] = action.payload
            if (state.single) {
                state.single = action.payload
            }
            state.error = null
        },
        [editItemLikes.rejected]: (state, action) => {
            state.likeLoading = false
            state.error = action.payload
        },
    }
})

export const { setItems, setItem } = itemsSlice.actions

export default itemsSlice.reducer