import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import dialogsReducer from "./slices/dialogsSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        dialogs: dialogsReducer
    }
})