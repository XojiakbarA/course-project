import CommonDialog from "./CommonDialog";
import TopicForm from "../forms/TopicForm";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "./ConfirmDialog";
import {useDispatch, useSelector} from "react-redux";
import {dialogsSelector, tagsSelector} from "../../store/selectors";
import {toggleCreateTag, toggleDeleteTag, toggleEditTag} from "../../store/slices/dialogsSlice";
import {createTag, deleteTag, editTag} from "../../store/asyncThunk/tagsAsyncThunk";
import {useTranslation} from "react-i18next";

const TagDialogsWrapper = ({ params }) => {

    const dispatch = useDispatch()
    const { t } = useTranslation()
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
                title={ t("createTag") }
                maxWidth={"xs"}
                open={tagDialog.create}
                onClose={toggleCreateTagDialog}
            >
                <TopicForm
                    buttonText={ t("create") }
                    buttonIcon={<AddToPhotosIcon/>}
                    buttonLoading={createLoading}
                    onCancelClick={toggleCreateTagDialog}
                    onSubmit={handleTagCreateSubmit}
                />
            </CommonDialog>
            <CommonDialog
                title={ t("editTag") }
                maxWidth={"xs"}
                open={tagDialog.edit}
                onClose={toggleEditTagDialog}
            >
                <TopicForm
                    buttonText={ t("edit") }
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
                content={ t("deleteConfirmTag") }
            />
        </>
    )
}

export default TagDialogsWrapper