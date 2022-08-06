import {CssBaseline, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import {useTheme} from "./hooks/useTheme";

const App = () => {

    const { theme } = useTheme()

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
                <Route index element={<MainLayout/>}>

                </Route>
            </Routes>
        </ThemeProvider>
    )
}

export default App