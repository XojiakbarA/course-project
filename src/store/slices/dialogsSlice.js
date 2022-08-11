import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    auth: { isOpen: false, isLogin: true },
    collection: { create: false, edit: false, delete: false },
    item: { create: false, edit: false, delete: false }
}

export const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        toggleAuthForm: (state) => {
            state.auth.isLogin = !state.auth.isLogin
        },
        toggleAuth: (state) => {
            state.auth.isOpen = !state.auth.isOpen
        },
        toggleCreateCollection: (state) => {
            state.collection.create = !state.collection.create
        },
        toggleEditCollection: (state) => {
            state.collection.edit = !state.collection.edit
        },
        toggleDeleteCollection: (state) => {
            state.collection.delete = !state.collection.delete
        },
        toggleCreateItem: (state) => {
            state.item.create = !state.item.create
        },
        toggleEditItem: (state) => {
            state.item.edit = !state.item.edit
        },
        toggleDeleteItme: (state) => {
            state.item.delete = !state.item.delete
        },
    }
})

export const { toggleAuthForm, toggleAuth, toggleCreateCollection, toggleEditCollection, toggleDeleteCollection } = dialogsSlice.actions

export default dialogsSlice.reducer