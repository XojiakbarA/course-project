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
import {collectionsSelector, dialogsSelector} from "./store/selectors";
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
import {getUser} from "./store/asyncThunk/authAsyncThunk";
import {setCollection} from "./store/slices/collectionsSlice";
import {appendToFormData} from "./utils/helpers";
import {
    createCollection,
    deleteCollection,
    deleteCollectionImage,
    editCollection
} from "./store/asyncThunk/collectionsAsyncThunk";

const App = () => {

    const dispatch = useDispatch()

    const { theme } = useTheme()
    const { collection: collectionDialog } = useSelector(dialogsSelector)
    const { single: collection, createLoading, editLoading, deleteLoading, deleteImageLoading } = useSelector(collectionsSelector)

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    const toggleCreateCollectionDialog = () => {
        dispatch(toggleCreateCollection())
    }
    const toggleEditCollectionDialog = () => {
        dispatch(setCollection(null))
        dispatch(toggleEditCollection())
    }
    const toggleDeleteCollectionDialog = () => {
        dispatch(setCollection(null))
        dispatch(toggleDeleteCollection())
    }
    const handleCreateSumbit = (data) => {
        const formData = appendToFormData(data)
        dispatch(createCollection({ data: formData }))
    }
    const handleEditSumbit = (data) => {
        const formData = appendToFormData(data)
        dispatch(editCollection({ id: collection?.id, data: formData }))
    }
    const handleDeleteClick = () => {
        dispatch(deleteCollection({ id: collection?.id }))
    }
    const handleDeleteImageClick = () => {
        dispatch(deleteCollectionImage({ id: collection?.id }))
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
                open={collectionDialog.create}
                onClose={toggleCreateCollectionDialog}
            >
                <CollectionForm
                    buttonText={"Create"}
                    buttonIcon={<AddToPhotosIcon/>}
                    buttonLoading={createLoading}
                    onCancelClick={toggleCreateCollectionDialog}
                    onSumbit={handleCreateSumbit}
                />
            </CommonDialog>
            <CommonDialog
                title={"Edit Collection"}
                maxWidth={"md"}
                open={collectionDialog.edit}
                onClose={toggleEditCollectionDialog}
            >
                <CollectionForm
                    buttonText={"Edit"}
                    buttonIcon={<EditIcon/>}
                    buttonLoading={editLoading}
                    onCancelClick={toggleEditCollectionDialog}
                    onSumbit={handleEditSumbit}
                    collection={collection}
                />
            </CommonDialog>
            <ConfirmDialog
                open={collectionDialog.delete}
                onClose={toggleDeleteCollectionDialog}
                onConfirmClick={handleDeleteClick}
                loading={deleteLoading}
                content={"Do you really want to delete the collection?"}
            />
            <ConfirmDialog
                open={collectionDialog.deleteImage}
                onClose={toggleDeleteCollectionDialog}
                onConfirmClick={handleDeleteImageClick}
                loading={deleteImageLoading}
                content={"Do you really want to delete the image?"}
            />
        </ThemeProvider>
    )
}

export default App