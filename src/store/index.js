import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import dialogsReducer from "./slices/dialogsSlice";
import snackbarReducer from "./slices/snackbarSlice";
import authReducer from "./slices/authSlice";
import collectionsReducer from "./slices/collectionsSlice";
import topicsReducer from "./slices/topicsSlice";
import itemsReducer from "./slices/itemsSlice";
import tagsReducer from "./slices/tagsSlice";
import commentsReducer from "./slices/commentsSlice";
import usersReducer from "./slices/usersSlice";
import rolesReducer from "./slices/rolesSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        dialogs: dialogsReducer,
        snackbar: snackbarReducer,
        auth: authReducer,
        collections: collectionsReducer,
        topics: topicsReducer,
        tags: tagsReducer,
        items: itemsReducer,
        comments: commentsReducer,
        users: usersReducer,
        roles: rolesReducer,
    }
})