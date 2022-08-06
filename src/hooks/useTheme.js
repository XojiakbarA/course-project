import { useMediaQuery } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { useDispatch, useSelector } from "react-redux"
import {setTheme} from "../store/slices/themeSlice";

export const useTheme = () => {

    const dispatch = useDispatch()

    const isDark = useMediaQuery('(prefers-color-scheme: dark)')

    const mode = useSelector(state => state.theme.mode)

    const handleModeChange = (e, newMode) => {
        if (newMode !== null) {
            console.log(newMode)
            localStorage.setItem('theme', newMode)
            dispatch(setTheme(newMode))
        }
    }

    const theme = createTheme({
        palette: { mode: mode ? mode : isDark ? 'dark' : 'light' }
    })

    return { theme, mode, handleModeChange }
}