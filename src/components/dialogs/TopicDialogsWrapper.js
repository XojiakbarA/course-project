import CommonDialog from "./CommonDialog";
import TopicForm from "../forms/TopicForm";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "./ConfirmDialog";
import {useDispatch, useSelector} from "react-redux";
import {dialogsSelector, topicsSelector} from "../../store/selectors";
import {toggleCreateTopic, toggleDeleteTopic, toggleEditTopic} from "../../store/slices/dialogsSlice";
import {createTopic, deleteTopic, editTopic} from "../../store/asyncThunk/topicsAsyncThunk";

const TopicDialogsWrapper = ({ params }) => {

    const dispatch = useDispatch()

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
                title={"Create Topic"}
                maxWidth={"xs"}
                open={topicDialog.create}
                onClose={toggleCreateTopicDialog}
            >
                <TopicForm
                    buttonText={"Create"}
                    buttonIcon={<AddToPhotosIcon/>}
                    buttonLoading={createLoading}
                    onCancelClick={toggleCreateTopicDialog}
                    onSubmit={handleTopicCreateSubmit}
                />
            </CommonDialog>
            <CommonDialog
                title={"Edit Topic"}
                maxWidth={"xs"}
                open={topicDialog.edit}
                onClose={toggleEditTopicDialog}
            >
                <TopicForm
                    buttonText={"Edit"}
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
                content={"Do you really want to delete the topic?"}
            />
        </>
    )
}

export default TopicDialogsWrapper