import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchCollectionItems} from "../../api/collections";
import {setSnackbar} from "../slices/snackbarSlice";
import {
    destroyItem,
    destroyItemImage,
    fetchItem,
    fetchItems,
    storeItem,
    updateItem,
    updateItemLikes
} from "../../api/items";
import {
    toggleCreateItem,
    toggleDeleteItem,
    toggleDeleteItemImage,
    toggleEditItem
} from "../slices/dialogsSlice";
import {fetchTagItems} from "../../api/tags";
import {FETCH_COLLECTION_ITEMS, FETCH_TAG_ITEMS} from "../fetchTypes";

export const getItems = createAsyncThunk("items/get",
    async ({ params }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchItems(params)
            if (res.status === 200) {
                return res.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const getCollectionItems = createAsyncThunk("items/collectionGet",
    async ({ id, params }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchCollectionItems(id, params)
            if (res.status === 200) {
                return res.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const getTagItems = createAsyncThunk("items/tagGet",
    async ({ id, params }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchTagItems(id, params)
            if (res.status === 200) {
                return res.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const getItem = createAsyncThunk("items/singleGet",
    async ({ id }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchItem(id)
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const createItem = createAsyncThunk("items/create",
    async ({ data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await storeItem(data)
            if (res.status === 201) {
                dispatch(toggleCreateItem())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const editItem = createAsyncThunk("items/edit",
    async ({ id, data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await updateItem(id, data)
            if (res.status === 200) {
                dispatch(toggleEditItem())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const deleteItem = createAsyncThunk("items/delete",
    async ({ id, fetchType, params, navigate }, { dispatch, rejectWithValue, getState }) => {
        try {
            const res = await destroyItem(id)
            if (res.status === 200) {
                dispatch(toggleDeleteItem())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                if (fetchType) {
                    let page;
                    switch (fetchType) {
                        case (FETCH_COLLECTION_ITEMS):
                            const collId = getState().collections.single.id
                            page = await fetchCollectionItems(collId, params)
                            break
                        case (FETCH_TAG_ITEMS):
                            const tagId = getState().tags.single.id
                            page = await fetchTagItems(tagId, params)
                            break
                        default:
                            page = await fetchItems(params)
                            break
                    }
                    if (page.status === 200) {
                        if (!page.data.last) {
                            const lastItem = page.data.data[page.data.data.length - 1]
                            return { id, lastItem }
                        }
                    }
                } else {
                    navigate && navigate(-1)
                }
                return { id }
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const deleteItemImage = createAsyncThunk("items/deleteImage",
    async ({ id }, { dispatch, rejectWithValue }) => {
        try {
            const res = await destroyItemImage(id)
            if (res.status === 200) {
                dispatch(toggleDeleteItemImage())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return id
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const editItemLikes = createAsyncThunk("items/editLikes",
    async ({ itemId, userId }, { dispatch, rejectWithValue }) => {
        try {
            const res = await updateItemLikes(itemId, userId)
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)