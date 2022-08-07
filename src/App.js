import {CssBaseline, ThemeProvider} from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import EditIcon from "@mui/icons-material/Edit";
import {Route, Routes} from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import Profile from "./pages/Profile";
import Collections from "./pages/Collections";
import CommonDialog from "./components/dialogs/CommonDialog";
import CollectionForm from "./components/forms/CollectionForm";
import ConfirmDialog from "./components/dialogs/ConfirmDialog";
import {useTheme} from "./hooks/useTheme";
import {useDispatch, useSelector} from "react-redux";
import {dialogsSelector} from "./store/selectors";
import {toggleCreateCollection, toggleDeleteCollection, toggleEditCollection} from "./store/slices/dialogsSlice";
import Items from "./pages/Items";

const App = () => {

    const dispatch = useDispatch()

    const { theme } = useTheme()
    const { collection } = useSelector(dialogsSelector)

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
                    <Route path={"/profile"} element={<Profile/>}/>
                    <Route path={"/collections/:id"} element={<Collections/>}/>
                    <Route path={"/items/:id"} element={<Items/>}/>
                </Route>
            </Routes>
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