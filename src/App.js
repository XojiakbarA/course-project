import {CssBaseline, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import MyCollections from "./pages/MyCollections";
import CollectionsID from "./pages/Collections/CollectionsID";
import {useTheme} from "./hooks/useTheme";
import {useDispatch} from "react-redux";
import ItemsID from "./pages/Items/ItemsID";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import Items from "./pages/Items";
import Collections from "./pages/Collections";
import AdminCollections from "./pages/admin/AdminCollections"
import CommonSnackbar from "./components/commons/CommonSnackbar";
import Protected from "./pages/Protected";
import {useEffect} from "react";
import OAuth2RedirectHandler from "./oauth2/OAuth2RedirectHandler";
import {getUser} from "./store/asyncThunk/authAsyncThunk";
import TagsID from "./pages/TagsID";
import ScrollToTop from "./pages/ScrollToTop";
import ScrollTop from "./components/commons/ScrollTop";
import Users from "./pages/admin/Users";
import Topics from "./pages/admin/Topics";
import UserDialogsWrapper from "./components/dialogs/UserDialogsWrapper";
import AdminItems from "./pages/admin/AdminItems";
import Tags from "./pages/admin/Tags";

const App = (props) => {

    const dispatch = useDispatch()

    const { theme } = useTheme()

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
                <Route element={<ScrollToTop/>}>
                    <Route path={"/"} element={<MainLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route element={<Protected/>}>
                            <Route path={"/my-collections"} element={<MyCollections/>}/>
                        </Route>
                        <Route path={"/collections"} element={<Collections/>}/>
                        <Route path={"/collections/:id"} element={<CollectionsID/>}/>
                        <Route path={"/items/"} element={<Items/>}/>
                        <Route path={"/items/:id"} element={<ItemsID/>}/>
                        <Route path={"/tags/:id"} element={<TagsID/>}/>
                        <Route path={"/admin"}>
                            <Route index element={<Dashboard/>}/>
                            <Route path={"/admin/users"} element={<Users/>}/>
                            <Route path={"/admin/topics"} element={<Topics/>}/>
                            <Route path={"/admin/collections"} element={<AdminCollections/>}/>
                            <Route path={"/admin/items"} element={<AdminItems/>}/>
                            <Route path={"/admin/tags"} element={<Tags/>}/>
                        </Route>
                    </Route>
                    <Route path={"/oauth2/redirect"} element={<OAuth2RedirectHandler/>}/>
                </Route>
            </Routes>
            <ScrollTop {...props}/>
            <CommonSnackbar/>
            <UserDialogsWrapper/>
        </ThemeProvider>
    )
}

export default App