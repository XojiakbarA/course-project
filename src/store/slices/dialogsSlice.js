import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    collection: { create: false, edit: false, delete: false },
    item: { create: false, edit: false, delete: false }
}

export const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        toggleCreateCollection: (state, action) => {
            state.collection.create = !state.collection.create
        },
        toggleEditCollection: (state, action) => {
            state.collection.edit = !state.collection.edit
        },
        toggleDeleteCollection: (state, action) => {
            state.collection.delete = !state.collection.delete
        },
        toggleCreateItem: (state, action) => {
            state.item.create = !state.item.create
        },
        toggleEditItem: (state, action) => {
            state.item.edit = !state.item.edit
        },
        toggleDeleteItme: (state, action) => {
            state.item.delete = !state.item.delete
        },
    }
})

export const { toggleCreateCollection, toggleEditCollection, toggleDeleteCollection } = dialogsSlice.actions

export default dialogsSlice.reducer