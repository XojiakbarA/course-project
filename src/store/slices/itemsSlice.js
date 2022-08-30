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
    hasMore: true,
    fetchType: null,
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
        },
        setFetchItemsType: (state, action) => {
            state.fetchType = action.payload
        }
    },
    extraReducers: {
        [getItems.pending]: (state) => {
            state.getLoading = true
        },
        [getItems.fulfilled]: (state, action) => {
            state.hasMore = !action.payload.last
            state.content.push(...action.payload.data)
            state.getLoading = false
        },
        [getItems.rejected]: (state, action) => {
            state.getLoading = false
        },
        [getCollectionItems.pending]: (state) => {
            state.getLoading = true
        },
        [getCollectionItems.fulfilled]: (state, action) => {
            state.hasMore = !action.payload.last
            state.content.push(...action.payload.data)
            state.getLoading = false
        },
        [getCollectionItems.rejected]: (state, action) => {
            state.getLoading = false
        },
        [getTagItems.pending]: (state) => {
            state.getLoading = true
        },
        [getTagItems.fulfilled]: (state, action) => {
            state.hasMore = !action.payload.last
            state.content.push(...action.payload.data)
            state.getLoading = false
        },
        [getTagItems.rejected]: (state, action) => {
            state.getLoading = false
        },
        [getItem.pending]: (state) => {
            state.getSingleLoading = true
        },
        [getItem.fulfilled]: (state, action) => {
            state.getSingleLoading = false
            state.single = action.payload
        },
        [getItem.rejected]: (state, action) => {
            state.getSingleLoading = false
        },
        [createItem.pending]: (state) => {
            state.createLoading = true
        },
        [createItem.fulfilled]: (state, action) => {
            if (state.hasMore) {
                state.content.pop()
            }
            state.content.unshift(action.payload)
            state.createLoading = false
        },
        [createItem.rejected]: (state) => {
            state.createLoading = false
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
            state.content = state.content.filter(i => i.id !== action.payload.id)
            if (action.payload.lastItem) {
                state.content.push(action.payload.lastItem)
            }
            state.single = null
            state.deleteLoading = false
        },
        [deleteItem.rejected]: (state) => {
            state.deleteLoading = false
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
        },
        [deleteItemImage.rejected]: (state, action) => {
            state.deleteImageLoading = false
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
        },
        [editItemLikes.rejected]: (state, action) => {
            state.likeLoading = false
        },
    }
})

export const { setItems, setItem, setFetchItemsType } = itemsSlice.actions

export default itemsSlice.reducer