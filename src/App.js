import {CssBaseline, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import {useTheme} from "./hooks/useTheme";
import Profile from "./pages/Profile";

const App = () => {

    const { theme } = useTheme()

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
                <Route path={"/"} element={<MainLayout/>}>
                    <Route path={"/profile"} element={<Profile/>}/>
                </Route>
            </Routes>
        </ThemeProvider>
    )
}

export default App