import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    auth: { isOpen: false, isLogin: true },
    collection: { create: false, edit: false, delete: false, deleteImage: false },
    item: { create: false, edit: false, delete: false, deleteImage: false }
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
        toggleDeleteCollectionImage: (state) => {
            state.collection.deleteImage = !state.collection.deleteImage
        },
        toggleCreateItem: (state) => {
            state.item.create = !state.item.create
        },
        toggleEditItem: (state) => {
            state.item.edit = !state.item.edit
        },
        toggleDeleteItem: (state) => {
            state.item.delete = !state.item.delete
        },
        toggleDeleteItemImage: (state) => {
            state.item.deleteImage = !state.item.deleteImage
        }
    }
})

export const {
    toggleAuthForm, toggleAuth,
    toggleCreateCollection, toggleEditCollection, toggleDeleteCollection, toggleDeleteCollectionImage,
    toggleCreateItem, toggleEditItem, toggleDeleteItem, toggleDeleteItemImage
} = dialogsSlice.actions

export default dialogsSlice.reducer