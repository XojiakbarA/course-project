import CommonDialog from "./CommonDialog";
import ItemForm from "../forms/ItemForm";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "./ConfirmDialog";
import {useDispatch, useSelector} from "react-redux";
import {dialogsSelector, itemsSelector} from "../../store/selectors";
import {
    toggleCreateItem,
    toggleDeleteItem,
    toggleDeleteItemImage,
    toggleEditItem
} from "../../store/slices/dialogsSlice";
import {appendToFormData} from "../../utils/helpers";
import {createItem, deleteItem, deleteItemImage, editItem} from "../../store/asyncThunk/itemsAsyncThunk";
import {useLocation, useNavigate} from "react-router";

const ItemDialogsWrapper = ({ params }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const { item: itemDialog } = useSelector(dialogsSelector)

    const { single: item, fetchType, createLoading, editLoading, deleteLoading, deleteImageLoading } = useSelector(itemsSelector)

    const toggleCreateItemDialog = () => {
        dispatch(toggleCreateItem())
    }
    const handleItemCreateSubmit = (data) => {
        const formData = appendToFormData(data)
        dispatch(createItem({ data: formData }))
    }

    const toggleEditItemDialog = () => {
        dispatch(toggleEditItem())
    }
    const handleItemEditSubmit = (data) => {
        const formData = appendToFormData(data)
        dispatch(editItem({ id: item?.id, data: formData }))
    }

    const toggleDeleteItemDialog = () => {
        dispatch(toggleDeleteItem())
    }
    const handleItemDeleteClick = () => {
        dispatch(deleteItem({
            id: item?.id,
            fetchType,
            params,
            navigate: location.pathname === `/items/${item?.id}` ? navigate : null
        }))
    }

    const toggleDeleteItemImageDialog = () => {
        dispatch(toggleDeleteItemImage())
    }
    const handleItemDeleteImageClick = () => {
        dispatch(deleteItemImage({ id: item?.id }))
    }

    return (
        <>
            <CommonDialog
                title={"Create Item"}
                maxWidth={"md"}
                open={itemDialog.create}
                onClose={toggleCreateItemDialog}
            >
                <ItemForm
                    buttonText={"Create"}
                    buttonIcon={<AddToPhotosIcon/>}
                    buttonLoading={createLoading}
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
                    buttonLoading={editLoading}
                    onCancelClick={toggleEditItemDialog}
                    onSubmit={handleItemEditSubmit}
                    item={item}
                />
            </CommonDialog>
            <ConfirmDialog
                open={itemDialog.delete}
                onClose={toggleDeleteItemDialog}
                onConfirmClick={handleItemDeleteClick}
                loading={deleteLoading}
                content={"Do you really want to delete the item?"}
            />
            <ConfirmDialog
                open={itemDialog.deleteImage}
                onClose={toggleDeleteItemImageDialog}
                onConfirmClick={handleItemDeleteImageClick}
                loading={deleteImageLoading}
                content={"Do you really want to delete the image?"}
            />
        </>
    )
}

export default ItemDialogsWrapper