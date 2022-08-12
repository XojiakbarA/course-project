import {CssBaseline, ThemeProvider} from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import EditIcon from "@mui/icons-material/Edit";
import {Route, Routes} from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import Profile from "./pages/Profile";
import CollectionsID from "./pages/Collections/CollectionsID";
import CommonDialog from "./components/dialogs/CommonDialog";
import CollectionForm from "./components/forms/CollectionForm";
import ConfirmDialog from "./components/dialogs/ConfirmDialog";
import {useTheme} from "./hooks/useTheme";
import {useDispatch, useSelector} from "react-redux";
import {dialogsSelector} from "./store/selectors";
import {toggleCreateCollection, toggleDeleteCollection, toggleEditCollection} from "./store/slices/dialogsSlice";
import ItemsID from "./pages/Items/ItemsID";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import Items from "./pages/Items";
import Collections from "./pages/Collections";
import CommonSnackbar from "./components/commons/CommonSnackbar";
import Protected from "./pages/Protected";
import {useEffect} from "react";
import OAuth2RedirectHandler from "./oauth2/OAuth2RedirectHandler";
import {getUser} from "./store/asyncThunk/userAsyncThunk";

const App = () => {

    const dispatch = useDispatch()

    const { theme } = useTheme()
    const { collection } = useSelector(dialogsSelector)

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    const toggleCreateCollectionDialog = () => {
        dispatch(toggleCreateCollection())
    }
    const toggleEditCollectionDialog = () => {
        dispatch(toggleEditCollection())
    }
    const toggleDeleteCollectionDialog = () => {
        dispatch(toggleDeleteCollection())
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
                <Route path={"/"} element={<MainLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route element={<Protected/>}>
                        <Route path={"/profile"} element={<Profile/>}/>
                    </Route>
                    <Route path={"/collections"} element={<Collections/>}/>
                    <Route path={"/collections/:id"} element={<CollectionsID/>}/>
                    <Route path={"/items/"} element={<Items/>}/>
                    <Route path={"/items/:id"} element={<ItemsID/>}/>
                    <Route path={"/admin"}>
                        <Route index element={<Dashboard/>}/>
                    </Route>
                </Route>
                <Route path={"/oauth2/redirect"} element={<OAuth2RedirectHandler/>}/>
            </Routes>
            <CommonSnackbar/>
            <CommonDialog
                title={"Create Collection"}
                maxWidth={"md"}
                open={collection.create}
                onClose={toggleCreateCollectionDialog}
            >
                <CollectionForm
                    buttonText={"Create"}
                    buttonIcon={<AddToPhotosIcon/>}
                    onCancelClick={toggleCreateCollectionDialog}
                />
            </CommonDialog>
            <CommonDialog
                title={"Edit Collection"}
                maxWidth={"md"}
                open={collection.edit}
                onClose={toggleEditCollectionDialog}
            >
                <CollectionForm
                    buttonText={"Edit"}
                    buttonIcon={<EditIcon/>}
                    onCancelClick={toggleEditCollectionDialog}
                />
            </CommonDialog>
            <ConfirmDialog
                open={collection.delete}
                onClose={toggleDeleteCollectionDialog}
                content={"Do you really want to delete the collection?"}
            />
        </ThemeProvider>
    )
}

export default App