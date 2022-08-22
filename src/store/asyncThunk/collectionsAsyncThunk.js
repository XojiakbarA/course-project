import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchUserCollections} from "../../api/users";
import {setSnackbar} from "../slices/snackbarSlice";
import {
    destroyCollection,
    destroyCollectionImage,
    fetchCollection, fetchCollections,
    storeCollection,
    updateCollection
} from "../../api/collections";
import {
    toggleCreateCollection,
    toggleDeleteCollection,
    toggleDeleteCollectionImage,
    toggleEditCollection
} from "../slices/dialogsSlice";

export const getCollections = createAsyncThunk("collections/get",
    async ({ params }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchCollections(params)
            if (res.status === 200) {
                console.log(res)
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const getUserCollections = createAsyncThunk("collections/userGet",
    async ({ id }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchUserCollections(id)
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const getCollection = createAsyncThunk("collections/singleGet",
    async ({ id }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchCollection(id)
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const createCollection = createAsyncThunk("collections/create",
    async ({ data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await storeCollection(data)
            if (res.status === 201) {
                dispatch(toggleCreateCollection())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const editCollection = createAsyncThunk("collections/edit",
    async ({ id, data }, { dispatch, rejectWithValue }) => {
        try {
            const res = await updateCollection(id, data)
            if (res.status === 200) {
                dispatch(toggleEditCollection())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return res.data.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const deleteCollection = createAsyncThunk("collections/delete",
    async ({ id, shouldCallNavigate, navigate }, { dispatch, rejectWithValue }) => {
        try {
            const res = await destroyCollection(id)
            if (res.status === 200) {
                dispatch(toggleDeleteCollection())
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

export const deleteCollectionImage = createAsyncThunk("collections/deleteImage",
    async ({ id }, { dispatch, rejectWithValue }) => {
        try {
            const res = await destroyCollectionImage(id)
            if (res.status === 200) {
                dispatch(toggleDeleteCollectionImage())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                return id
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)