import {createSlice} from "@reduxjs/toolkit";
import {getUsers, editUser, deleteUserImage, deleteUser, createUser} from "../asyncThunk/usersAsyncThunk";

const initialState = {
    content: [],
    single: null,
    hasMore: true,
    getLoading: false,
    getSingleLoading: false,
    createLoading: false,
    editLoading: false,
    deleteLoading: false,
    deleteImageLoading: false
}

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.content = action.payload
        },
        setUser: (state, action) => {
            state.single = action.payload
        }
    },
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.getLoading = true
        },
        [getUsers.fulfilled]: (state, action) => {
            state.hasMore = !action.payload.last
            state.content.push(...action.payload.data)
            state.getLoading = false
        },
        [getUsers.rejected]: (state) => {
            state.getLoading = false
        },
        [createUser.pending]: (state) => {
            state.createLoading = true
        },
        [createUser.fulfilled]: (state, action) => {
            if (state.hasMore) {
                state.content.pop()
            }
            state.content.unshift(action.payload)
            state.createLoading = false
        },
        [createUser.rejected]: (state) => {
            state.createLoading = false
        },
        [editUser.pending]: (state) => {
            state.editLoading = true
        },
        [editUser.fulfilled]: (state, action) => {
            state.editLoading = false
            const i = state.content.findIndex(i => i.id === action.payload.id)
            state.content[i] = action.payload
            state.single = action.payload
        },
        [editUser.rejected]: (state) => {
            state.editLoading = false
        },
        [deleteUser.pending]: (state) => {
            state.deleteLoading = true
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.content = state.content.filter(i => i.id !== action.payload.id)
            if (action.payload.lastUser) {
                state.content.push(action.payload.lastUser)
            }
            state.single = null
            state.deleteLoading = false
        },
        [deleteUser.rejected]: (state) => {
            state.deleteLoading = false
        },
        [deleteUserImage.pending]: (state) => {
            state.deleteImageLoading = true
        },
        [deleteUserImage.fulfilled]: (state, action) => {
            state.deleteImageLoading = false
            const i = state.content.findIndex(i => i.id === action.payload)
            const user = state.content.find(i => i.id === action.payload)
            state.content[i] = { ...user, image: null }
            state.single = { ...user, image: null }
            state.error = null
        },
        [deleteUserImage.rejected]: (state) => {
            state.deleteImageLoading = false
        },
    }
})

export const { setUsers, setUser } = usersSlice.actions

export default usersSlice.reducer