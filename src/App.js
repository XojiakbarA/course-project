import {Button, CssBaseline, Fab, Stack, ThemeProvider, Typography} from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Route, Routes, useLocation, useNavigate} from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import MyCollections from "./pages/MyCollections";
import CollectionsID from "./pages/Collections/CollectionsID";
import CommonDialog from "./components/dialogs/CommonDialog";
import CollectionForm from "./components/forms/CollectionForm";
import ConfirmDialog from "./components/dialogs/ConfirmDialog";
import {useTheme} from "./hooks/useTheme";
import {useDispatch, useSelector} from "react-redux";
import {collectionsSelector, dialogsSelector, itemsSelector, usersSelector} from "./store/selectors";
import {
    toggleCreateCollection,
    toggleCreateItem, toggleCreateUser,
    toggleDeleteCollection,
    toggleDeleteCollectionImage,
    toggleDeleteItem,
    toggleDeleteItemImage,
    toggleDeleteUserImage,
    toggleEditCollection,
    toggleEditItem,
    toggleEditUser, toggleLoginUser
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
import {deleteUserImage, editUser} from "./store/asyncThunk/usersAsyncThunk";
import {appendToFormData} from "./utils/helpers";
import {
    createCollection,
    deleteCollection,
    deleteCollectionImage,
    editCollection
} from "./store/asyncThunk/collectionsAsyncThunk";
import ItemForm from "./components/forms/ItemForm";
import {createItem, deleteItem, deleteItemImage, editItem} from "./store/asyncThunk/itemsAsyncThunk";
import TagsID from "./pages/TagsID";
import ScrollToTop from "./pages/ScrollToTop";
import ScrollTop from "./components/commons/ScrollTop";
import Users from "./pages/admin/Users";
import UserForm from "./components/forms/UserForm";
import RegisterForm from "./components/forms/RegisterForm";
import LoginForm from "./components/forms/LoginForm";

const App = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const { theme } = useTheme()
    const { collection: collectionDialog, item: itemDialog, user: userDialog } = useSelector(dialogsSelector)
    const { single: collection, createLoading: collectionCreateLoading, editLoading: collectionEditLoading, deleteLoading: collectionDeleteLoading, deleteImageLoading: collectionDeleteImageLoading } = useSelector(collectionsSelector)
    const { single: item, createLoading: itemCreateLoading, editLoading: itemEditLoading, deleteLoading: itemDeleteLoading, deleteImageLoading: itemDeleteImageLoading } = useSelector(itemsSelector)
    const { single: user, editLoading: userEditLoading, deleteImageLoading: userDeleteImageLoading } = useSelector(usersSelector)

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
    const toggleCreateUserDialog = () => {
        dispatch(toggleCreateUser())
    }
    const toggleEditUserDialog = () => {
        dispatch(toggleEditUser())
    }
    const toggleDeleteUserImageDialog = () => {
        dispatch(toggleDeleteUserImage())
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
    const handleUserEditSubmit = (data) => {
        const formData = appendToFormData(data)
        dispatch(editUser({ id: user?.id, data: formData }))
    }
    const handleUserDeleteImageClick = () => {
        dispatch(deleteUserImage({ id: user?.id }))
    }
    const toggleLoginUserDialog = () => {
        dispatch(toggleLoginUser())
    }
    const toggleAuthDialog = () => {
        dispatch(toggleLoginUser())
        dispatch(toggleCreateUser())
    }

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
                        </Route>
                    </Route>
                    <Route path={"/oauth2/redirect"} element={<OAuth2RedirectHandler/>}/>
                </Route>
            </Routes>
            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
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
            <CommonDialog
                title={"Login"}
                maxWidth={"xs"}
                open={userDialog.login}
                onClose={toggleLoginUserDialog}
            >
                <Stack spacing={2}>
                    <LoginForm/>
                    <Stack direction={"row"} spacing={2} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography>Don't have an account yet?</Typography>
                        <Button onClick={toggleAuthDialog}>Register</Button>
                    </Stack>
                </Stack>
            </CommonDialog>
            <CommonDialog
                title={"Create User"}
                maxWidth={"xs"}
                open={userDialog.create}
                onClose={toggleCreateUserDialog}
            >
                <RegisterForm/>
                <Stack direction={"row"} spacing={2} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography>Already have an account?</Typography>
                    <Button onClick={toggleAuthDialog}>Login</Button>
                </Stack>
            </CommonDialog>
            <CommonDialog
                title={"Edit User"}
                maxWidth={"xs"}
                open={userDialog.edit}
                onClose={toggleEditUserDialog}
            >
                <UserForm
                    buttonText={"Edit"}
                    buttonIcon={<EditIcon/>}
                    buttonLoading={userEditLoading}
                    onSubmit={handleUserEditSubmit}
                    user={user}
                />
            </CommonDialog>
            <ConfirmDialog
                open={userDialog.deleteImage}
                onClose={toggleDeleteUserImageDialog}
                onConfirmClick={handleUserDeleteImageClick}
                loading={userDeleteImageLoading}
                content={"Do you really want to delete the image?"}
            />
        </ThemeProvider>
    )
}

export default App