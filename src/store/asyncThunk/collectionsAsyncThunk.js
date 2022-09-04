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
import {FETCH_USER_COLLECTIONS} from "../fetchTypes";

export const getCollections = createAsyncThunk("collections/get",
    async ({ params }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchCollections(params)
            if (res.status === 200) {
                return res.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const getUserCollections = createAsyncThunk("collections/userGet",
    async ({ id, params }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchUserCollections(id, params)
            if (res.status === 200) {
                return res.data
            }
        } catch ({ response }) {
            dispatch(setSnackbar({ data: response.data.message, open: true, color: "error" }))
            return rejectWithValue(response.data.message)
        }
    }
)

export const getCollection = createAsyncThunk("collections/singleGet",
    async ({ id, navigate }, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetchCollection(id)
            if (res.status === 200) {
                return res.data.data
            }
        } catch ({ response }) {
            if (response.status === 404) navigate("/")
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
    async ({ id, fetchType, params, navigate }, { dispatch, rejectWithValue, getState }) => {
        try {
            const res = await destroyCollection(id)
            if (res.status === 200) {
                dispatch(toggleDeleteCollection())
                dispatch(setSnackbar({ data: res.data.message, open: true, color: "success" }))
                if (fetchType) {
                    let page;
                    switch (fetchType) {
                        case (FETCH_USER_COLLECTIONS):
                            const id = getState().auth.user.id
                            page = await fetchUserCollections(id, params)
                            break
                        default:
                            page = await fetchCollections(params)
                            break
                    }
                    if (page.status === 200) {
                        if (!page.data.last) {
                            const lastCollection = page.data.data[page.data.data.length - 1]
                            return { id, lastCollection }
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