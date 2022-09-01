import CommonDialog from "./CommonDialog";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "./ConfirmDialog";
import {useDispatch, useSelector} from "react-redux";
import {commentsSelector, dialogsSelector} from "../../store/selectors";
import {toggleCreateComment, toggleDeleteComment, toggleEditComment} from "../../store/slices/dialogsSlice";
import {createComment, deleteComment, editComment} from "../../store/asyncThunk/commentsAsyncThunk";
import CommentForm from "../forms/CommentForm";

const CommentDialogsWrapper = ({ params }) => {

    const dispatch = useDispatch()

    const { comment: commentDialog } = useSelector(dialogsSelector)

    const { single: comment, createLoading, editLoading, deleteLoading } = useSelector(commentsSelector)

    const toggleCreateCommentDialog = () => {
        dispatch(toggleCreateComment())
    }
    const handleCommentCreateSubmit = (data) => {
        dispatch(createComment({ data }))
    }

    const toggleEditCommentDialog = () => {
        dispatch(toggleEditComment())
    }
    const handleCommentEditSubmit = (data) => {
        dispatch(editComment({ id: comment?.id, data }))
    }

    const toggleDeleteCommentDialog = () => {
        dispatch(toggleDeleteComment())
    }
    const handleCommentDeleteClick = () => {
        dispatch(deleteComment({ id: comment?.id, params }))
    }

    return (
        <>
            <CommonDialog
                title={"Create Comment"}
                maxWidth={"xs"}
                open={commentDialog.create}
                onClose={toggleCreateCommentDialog}
            >
                <CommentForm
                    buttonText={"Create"}
                    buttonIcon={<AddToPhotosIcon/>}
                    buttonLoading={createLoading}
                    onCancelClick={toggleCreateCommentDialog}
                    onSubmit={handleCommentCreateSubmit}
                />
            </CommonDialog>
            <CommonDialog
                title={"Edit Comment"}
                maxWidth={"xs"}
                open={commentDialog.edit}
                onClose={toggleEditCommentDialog}
            >
                <CommentForm
                    buttonText={"Edit"}
                    buttonIcon={<EditIcon/>}
                    buttonLoading={editLoading}
                    onCancelClick={toggleEditCommentDialog}
                    onSubmit={handleCommentEditSubmit}
                    comment={comment}
                />
            </CommonDialog>
            <ConfirmDialog
                open={commentDialog.delete}
                onClose={toggleDeleteCommentDialog}
                onConfirmClick={handleCommentDeleteClick}
                loading={deleteLoading}
                content={"Do you really want to delete the comment?"}
            />
        </>
    )
}

export default CommentDialogsWrapper