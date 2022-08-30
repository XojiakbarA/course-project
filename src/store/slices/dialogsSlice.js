import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    collection: { create: false, edit: false, delete: false, deleteImage: false },
    item: { create: false, edit: false, delete: false, deleteImage: false },
    user: { login: false, create: false, edit: false, delete: false, deleteImage: false },
    topic: { create: false, edit: false, delete: false }
}

export const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
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
        },
        toggleLoginUser: (state) => {
            state.user.login = !state.user.login
        },
        toggleCreateUser: (state) => {
            state.user.create = !state.user.create
        },
        toggleEditUser: (state) => {
            state.user.edit = !state.user.edit
        },
        toggleDeleteUser: (state) => {
            state.user.delete = !state.user.delete
        },
        toggleDeleteUserImage: (state) => {
            state.user.deleteImage = !state.user.deleteImage
        },
        toggleCreateTopic: (state) => {
            state.topic.create = !state.topic.create
        },
        toggleEditTopic: (state) => {
            state.topic.edit = !state.topic.edit
        },
        toggleDeleteTopic: (state) => {
            state.topic.delete = !state.topic.delete
        }
    }
})

export const {
    toggleCreateCollection, toggleEditCollection, toggleDeleteCollection, toggleDeleteCollectionImage,
    toggleCreateItem, toggleEditItem, toggleDeleteItem, toggleDeleteItemImage,
    toggleLoginUser, toggleCreateUser, toggleEditUser, toggleDeleteUser, toggleDeleteUserImage,
    toggleCreateTopic, toggleEditTopic, toggleDeleteTopic
} = dialogsSlice.actions

export default dialogsSlice.reducer