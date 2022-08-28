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

export const getItems = createAsyncThunk("items/get",
    async ({ params, setHasMore }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchItems(params)
            if (res.status === 200) {
                if (setHasMore) setHasMore(!res.data.last)
                return res.data.data
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
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const getTagItems = createAsyncThunk("items/tagGet",
    async ({ id, params, setHasMore }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchTagItems(id, params)
            if (res.status === 200) {
                setHasMore(!res.data.last)
                return res.data.data
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
    async ({ id, shouldCallNavigate, navigate }, { dispatch, rejectWithValue }) => {
        try {
            const res = await destroyItem(id)
            if (res.status === 200) {
                dispatch(toggleDeleteItem())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                shouldCallNavigate && navigate(-1)
                return id
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