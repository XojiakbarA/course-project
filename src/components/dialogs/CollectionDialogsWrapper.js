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

const CollectionDialogsWrapper = ({ params }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

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
                    buttonLoading={editLoading}
                    onCancelClick={toggleEditCollectionDialog}
                    onSumbit={handleCollectionEditSubmit}
                    collection={collection}
                />
            </CommonDialog>
            <ConfirmDialog
                open={collectionDialog.delete}
                onClose={toggleDeleteCollectionDialog}
                onConfirmClick={handleCollectionDeleteClick}
                loading={deleteLoading}
                content={"Do you really want to delete the collection?"}
            />
            <ConfirmDialog
                open={collectionDialog.deleteImage}
                onClose={toggleDeleteCollectionImageDialog}
                onConfirmClick={handleDeleteCollectionImageClick}
                loading={deleteImageLoading}
                content={"Do you really want to delete the image?"}
            />
        </>
    )
}

export default CollectionDialogsWrapper