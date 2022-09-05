import CommonDialog from "./CommonDialog";
import CollectionForm from "../forms/CollectionForm";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "./ConfirmDialog";
import {useDispatch, useSelector} from "react-redux";
import {collectionsSelector, dialogsSelector} from "../../store/selectors";
import {
    toggleCreateCollection,
    toggleDeleteCollection,
    toggleDeleteCollectionImage,
    toggleEditCollection
} from "../../store/slices/dialogsSlice";
import {appendToFormData} from "../../utils/helpers";
import {
    createCollection,
    deleteCollection,
    deleteCollectionImage,
    editCollection
} from "../../store/asyncThunk/collectionsAsyncThunk";
import {useLocation, useNavigate} from "react-router";
import {setFetchCollectionsType} from "../../store/slices/collectionsSlice";
import {useTranslation} from "react-i18next";

const CollectionDialogsWrapper = ({ params }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { t } = useTranslation()

    const { collection: collectionDialog } = useSelector(dialogsSelector)

    const { single: collection, fetchType, createLoading, editLoading, deleteLoading, deleteImageLoading } = useSelector(collectionsSelector)

    const toggleCreateCollectionDialog = () => {
        dispatch(toggleCreateCollection())
    }
    const handleCollectionCreateSubmit = (data) => {
        const formData = appendToFormData(data)
        dispatch(createCollection({ data: formData }))
    }

    const toggleEditCollectionDialog = () => {
        dispatch(toggleEditCollection())
    }
    const handleCollectionEditSubmit = (data) => {
        const formData = appendToFormData(data)
        dispatch(editCollection({ id: collection?.id, data: formData }))
    }

    const toggleDeleteCollectionDialog = () => {
        dispatch(setFetchCollectionsType(null))
        dispatch(toggleDeleteCollection())
    }
    const handleCollectionDeleteClick = () => {
        dispatch(deleteCollection({
            id: collection?.id,
            fetchType,
            params,
            navigate: location.pathname === `/collections/${collection?.id}` ? navigate : null,
        }))
    }

    const toggleDeleteCollectionImageDialog = () => {
        dispatch(toggleDeleteCollectionImage())
    }
    const handleDeleteCollectionImageClick = () => {
        dispatch(deleteCollectionImage({ id: collection?.id }))
    }

    return (
        <>
            <CommonDialog
                title={ t("createCollection") }
                maxWidth={"md"}
                open={collectionDialog.create}
                onClose={toggleCreateCollectionDialog}
            >
                <CollectionForm
                    buttonText={ t("create") }
                    buttonIcon={<AddToPhotosIcon/>}
                    buttonLoading={createLoading}
                    onSubmit={handleCollectionCreateSubmit}
                />
            </CommonDialog>
            <CommonDialog
                title={ t("editCollection") }
                maxWidth={"md"}
                open={collectionDialog.edit}
                onClose={toggleEditCollectionDialog}
            >
                <CollectionForm
                    buttonText={ t("edit") }
                    buttonIcon={<EditIcon/>}
                    buttonLoading={editLoading}
                    onSubmit={handleCollectionEditSubmit}
                    collection={collection}
                />
            </CommonDialog>
            <ConfirmDialog
                open={collectionDialog.delete}
                onClose={toggleDeleteCollectionDialog}
                onConfirmClick={handleCollectionDeleteClick}
                loading={deleteLoading}
                content={ t("deleteConfirmCollection") }
            />
            <ConfirmDialog
                open={collectionDialog.deleteImage}
                onClose={toggleDeleteCollectionImageDialog}
                onConfirmClick={handleDeleteCollectionImageClick}
                loading={deleteImageLoading}
                content={ t("deleteConfirmImage") }
            />
        </>
    )
}

export default CollectionDialogsWrapper