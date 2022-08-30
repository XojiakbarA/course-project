import CommonDialog from "./CommonDialog";
import TopicForm from "../forms/TopicForm";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "./ConfirmDialog";
import {useDispatch, useSelector} from "react-redux";
import {dialogsSelector, tagsSelector} from "../../store/selectors";
import {toggleCreateTag, toggleDeleteTag, toggleEditTag} from "../../store/slices/dialogsSlice";
import {createTag, deleteTag, editTag} from "../../store/asyncThunk/tagsAsyncThunk";

const TagDialogsWrapper = ({ params }) => {

    const dispatch = useDispatch()

    const { tag: tagDialog } = useSelector(dialogsSelector)

    const { single: tag, createLoading, editLoading, deleteLoading } = useSelector(tagsSelector)

    const toggleCreateTagDialog = () => {
        dispatch(toggleCreateTag())
    }
    const handleTagCreateSubmit = (data) => {
        dispatch(createTag({ data }))
    }

    const toggleEditTagDialog = () => {
        dispatch(toggleEditTag())
    }
    const handleTagEditSubmit = (data) => {
        dispatch(editTag({ id: tag?.id, data }))
    }

    const toggleDeleteTagDialog = () => {
        dispatch(toggleDeleteTag())
    }
    const handleTagDeleteClick = () => {
        dispatch(deleteTag({ id: tag?.id, params }))
    }

    return (
        <>
            <CommonDialog
                title={"Create Tag"}
                maxWidth={"xs"}
                open={tagDialog.create}
                onClose={toggleCreateTagDialog}
            >
                <TopicForm
                    buttonText={"Create"}
                    buttonIcon={<AddToPhotosIcon/>}
                    buttonLoading={createLoading}
                    onCancelClick={toggleCreateTagDialog}
                    onSubmit={handleTagCreateSubmit}
                />
            </CommonDialog>
            <CommonDialog
                title={"Edit Tag"}
                maxWidth={"xs"}
                open={tagDialog.edit}
                onClose={toggleEditTagDialog}
            >
                <TopicForm
                    buttonText={"Edit"}
                    buttonIcon={<EditIcon/>}
                    buttonLoading={editLoading}
                    onCancelClick={toggleEditTagDialog}
                    onSubmit={handleTagEditSubmit}
                    topic={tag}
                />
            </CommonDialog>
            <ConfirmDialog
                open={tagDialog.delete}
                onClose={toggleDeleteTagDialog}
                onConfirmClick={handleTagDeleteClick}
                loading={deleteLoading}
                content={"Do you really want to delete the tag?"}
            />
        </>
    )
}

export default TagDialogsWrapper