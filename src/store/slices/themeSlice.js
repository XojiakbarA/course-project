import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    mode: localStorage.getItem("theme")
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.mode = action.payload
        }
    }
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer