import CommonDialog from "./CommonDialog";
import TopicForm from "../forms/TopicForm";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "./ConfirmDialog";
import {useDispatch, useSelector} from "react-redux";
import {dialogsSelector, topicsSelector} from "../../store/selectors";
import {toggleCreateTopic, toggleDeleteTopic, toggleEditTopic} from "../../store/slices/dialogsSlice";
import {createTopic, deleteTopic, editTopic} from "../../store/asyncThunk/topicsAsyncThunk";
import {useTranslation} from "react-i18next";

const TopicDialogsWrapper = ({ params }) => {

    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { topic: topicDialog } = useSelector(dialogsSelector)

    const { single: topic, createLoading, editLoading, deleteLoading } = useSelector(topicsSelector)

    const toggleCreateTopicDialog = () => {
        dispatch(toggleCreateTopic())
    }
    const handleTopicCreateSubmit = (data) => {
        dispatch(createTopic({ data }))
    }

    const toggleEditTopicDialog = () => {
        dispatch(toggleEditTopic())
    }
    const handleTopicEditSubmit = (data) => {
        dispatch(editTopic({ id: topic?.id, data }))
    }

    const toggleDeleteTopicDialog = () => {
        dispatch(toggleDeleteTopic())
    }
    const handleTopicDeleteClick = () => {
        dispatch(deleteTopic({ id: topic?.id, params }))
    }

    return (
        <>
            <CommonDialog
                title={ t("createTopic") }
                maxWidth={"xs"}
                open={topicDialog.create}
                onClose={toggleCreateTopicDialog}
            >
                <TopicForm
                    buttonText={ t("create") }
                    buttonIcon={<AddToPhotosIcon/>}
                    buttonLoading={createLoading}
                    onCancelClick={toggleCreateTopicDialog}
                    onSubmit={handleTopicCreateSubmit}
                />
            </CommonDialog>
            <CommonDialog
                title={ t("editTopic") }
                maxWidth={"xs"}
                open={topicDialog.edit}
                onClose={toggleEditTopicDialog}
            >
                <TopicForm
                    buttonText={ t("edit") }
                    buttonIcon={<EditIcon/>}
                    buttonLoading={editLoading}
                    onCancelClick={toggleEditTopicDialog}
                    onSubmit={handleTopicEditSubmit}
                    topic={topic}
                />
            </CommonDialog>
            <ConfirmDialog
                open={topicDialog.delete}
                onClose={toggleDeleteTopicDialog}
                onConfirmClick={handleTopicDeleteClick}
                loading={deleteLoading}
                content={ t("deleteConfirmTopic") }
            />
        </>
    )
}

export default TopicDialogsWrapper