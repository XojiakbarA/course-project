import {CssBaseline, ThemeProvider} from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import EditIcon from "@mui/icons-material/Edit";
import {Route, Routes, useLocation, useNavigate} from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import Profile from "./pages/Profile";
import CollectionsID from "./pages/Collections/CollectionsID";
import CommonDialog from "./components/dialogs/CommonDialog";
import CollectionForm from "./components/forms/CollectionForm";
import ConfirmDialog from "./components/dialogs/ConfirmDialog";
import {useTheme} from "./hooks/useTheme";
import {useDispatch, useSelector} from "react-redux";
import {collectionsSelector, dialogsSelector, itemsSelector} from "./store/selectors";
import {
    toggleCreateCollection,
    toggleCreateItem,
    toggleDeleteCollection, toggleDeleteCollectionImage, toggleDeleteItem, toggleDeleteItemImage,
    toggleEditCollection, toggleEditItem
} from "./store/slices/dialogsSlice";
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
import {appendToFormData} from "./utils/helpers";
import {
    createCollection,
    deleteCollection,
    deleteCollectionImage,
    editCollection
} from "./store/asyncThunk/collectionsAsyncThunk";
import ItemForm from "./components/forms/ItemForm";
import {createItem, deleteItem, deleteItemImage, editItem} from "./store/asyncThunk/itemsAsyncThunk";

const App = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const { theme } = useTheme()
    const { collection: collectionDialog, item: itemDialog } = useSelector(dialogsSelector)
    const { single: collection, createLoading: collectionCreateLoading, editLoading: collectionEditLoading, deleteLoading: collectionDeleteLoading, deleteImageLoading: collectionDeleteImageLoading } = useSelector(collectionsSelector)
    const { single: item, createLoading: itemCreateLoading, editLoading: itemEditLoading, deleteLoading: itemDeleteLoading, deleteImageLoading: itemDeleteImageLoading } = useSelector(itemsSelector)

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
    const toggleDeleteCollectionImageDialog = () => {
        dispatch(toggleDeleteCollectionImage())
    }
    const toggleCreateItemDialog = () => {
        dispatch(toggleCreateItem())
    }
    const toggleEditItemDialog = () => {
        dispatch(toggleEditItem())
    }
    const toggleDeleteItemDialog = () => {
        dispatch(toggleDeleteItem())
    }
    const toggleDeleteItemImageDialog = () => {
        dispatch(toggleDeleteItemImage())
    }
    const handleCollectionCreateSubmit = (data) => {
        const formData = appendToFormData(data)
        dispatch(createCollection({ data: formData }))
    }
    const handleItemCreateSubmit = (data) => {
        const formData = appendToFormData(data)
        dispatch(createItem({ data: formData }))
    }
    const handleCollectionEditSubmit = (data) => {
        const formData = appendToFormData(data)
        dispatch(editCollection({ id: collection?.id, data: formData }))
    }
    const handleItemEditSubmit = (data) => {
        const formData = appendToFormData(data)
        dispatch(editItem({ id: item?.id, data: formData }))
    }
    const handleCollectionDeleteClick = () => {
        dispatch(deleteCollection({
            id: collection?.id,
            shouldCallNavigate: location.pathname === `/collections/${collection?.id}`,
            navigate,
        }))
    }
    const handleItemDeleteClick = () => {
        dispatch(deleteItem({
            id: item?.id,
            shouldCallNavigate: location.pathname === `/items/${item?.id}`,
            navigate
        }))
    }
    const handleDeleteCollectionImageClick = () => {
        dispatch(deleteCollectionImage({ id: collection?.id }))
    }
    const handleItemDeleteImageClick = () => {
        dispatch(deleteItemImage({ id: item?.id }))
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
                    buttonLoading={collectionCreateLoading}
                    onCancelClick={toggleCreateCollectionDialog}
                    onSumbit={handleCollectionCreateSubmit}
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
                    buttonLoading={collectionEditLoading}
                    onCancelClick={toggleEditCollectionDialog}
                    onSumbit={handleCollectionEditSubmit}
                    collection={collection}
                />
            </CommonDialog>
            <ConfirmDialog
                open={collectionDialog.delete}
                onClose={toggleDeleteCollectionDialog}
                onConfirmClick={handleCollectionDeleteClick}
                loading={collectionDeleteLoading}
                content={"Do you really want to delete the collection?"}
            />
            <ConfirmDialog
                open={collectionDialog.deleteImage}
                onClose={toggleDeleteCollectionImageDialog}
                onConfirmClick={handleDeleteCollectionImageClick}
                loading={collectionDeleteImageLoading}
                content={"Do you really want to delete the image?"}
            />
            <CommonDialog
                title={"Create Item"}
                maxWidth={"md"}
                open={itemDialog.create}
                onClose={toggleCreateItemDialog}
            >
                <ItemForm
                    buttonText={"Create"}
                    buttonIcon={<AddToPhotosIcon/>}
                    buttonLoading={itemCreateLoading}
                    onCancelClick={toggleCreateItemDialog}
                    onSubmit={handleItemCreateSubmit}
                />
            </CommonDialog>
            <CommonDialog
                title={"Edit Item"}
                maxWidth={"md"}
                open={itemDialog.edit}
                onClose={toggleEditItemDialog}
            >
                <ItemForm
                    buttonText={"Edit"}
                    buttonIcon={<EditIcon/>}
                    buttonLoading={itemEditLoading}
                    onCancelClick={toggleEditItemDialog}
                    onSubmit={handleItemEditSubmit}
                    item={item}
                />
            </CommonDialog>
            <ConfirmDialog
                open={itemDialog.delete}
                onClose={toggleDeleteItemDialog}
                onConfirmClick={handleItemDeleteClick}
                loading={itemDeleteLoading}
                content={"Do you really want to delete the item?"}
            />
            <ConfirmDialog
                open={itemDialog.deleteImage}
                onClose={toggleDeleteItemImageDialog}
                onConfirmClick={handleItemDeleteImageClick}
                loading={itemDeleteImageLoading}
                content={"Do you really want to delete the image?"}
            />
        </ThemeProvider>
    )
}

export default App