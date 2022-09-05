import {CircularProgress, Grid, Stack, useMediaQuery} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import ItemSingleCard from "../../components/cards/ItemSingleCard";
import PageTitle from "../../components/commons/PageTitle";
import CommentCard from "../../components/cards/CommentCard";
import CommentForm from "../../components/forms/CommentForm";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {useEffect} from "react";
import {getItem} from "../../store/asyncThunk/itemsAsyncThunk";
import {setItem} from "../../store/slices/itemsSlice";
import {commentsSelector, dialogsSelector, itemsSelector} from "../../store/selectors";
import {getItemComments} from "../../store/asyncThunk/commentsAsyncThunk";
import {addComment, setComments} from "../../store/slices/commentsSlice";
import ItemSingleSkeleton from "../../components/skeletons/ItemSingleSkeleton";
import {useStompClient, useSubscription} from "react-stomp-hooks";
import {setSnackbar} from "../../store/slices/snackbarSlice";
import ItemDialogsWrapper from "../../components/dialogs/ItemDialogsWrapper";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import CommonDialog from "../../components/dialogs/CommonDialog";
import {toggleCreateComment} from "../../store/slices/dialogsSlice";
import {useTranslation} from "react-i18next";

const ItemsID = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation()

    const { comment: commentDialog } = useSelector(dialogsSelector)
    const { single: item, getSingleLoading } = useSelector(itemsSelector)
    const { content: comments, getLoading } = useSelector(commentsSelector)

    useEffect(() => {
        dispatch(getItem({ id, navigate }))
        dispatch(getItemComments({ id }))
    }, [dispatch, navigate, id])
    useEffect(() => {
        return () => {
            dispatch(setItem(null))
            dispatch(setComments([]))
        }
    }, [dispatch])

    const client = useStompClient()

    const handleCommentReceived = (payload) => {
        const comment = JSON.parse(payload.body).data
        dispatch(addComment(comment))
    }
    const handleErrorReceived = (payload) => {
        const response = JSON.parse(payload.body)
        dispatch(setSnackbar({ data: response.message, open: true, color: "error" }))
    }

    useSubscription("/comments", handleCommentReceived)
    useSubscription("/comments/errors", handleErrorReceived)

    const handleCreateCommentSubmit = (data) => {
        client.publish({ destination: "/app/comments/create", body: JSON.stringify(data) })
        dispatch(toggleCreateComment())
    }
    const toggleCreateCommentDialog = () => {
        dispatch(toggleCreateComment())
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {
                    getSingleLoading
                    ?
                    <ItemSingleSkeleton/>
                    :
                    <ItemSingleCard item={item}/>
                }
            </Grid>
            <Grid item xs={12} md={7} lg={8} display={"flex"} justifyContent={"center"}>
                <PageTitle
                    text={ t("comments") }
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<CommentIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid xs={0} md={5} item lg={4}/>
            <Grid item xs={12} md={7} lg={8}>
                <Stack
                    spacing={2}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"start"}
                >
                    {
                        getLoading
                        ?
                        <CircularProgress/>
                        :
                        comments?.map(comment => (
                            <CommentCard key={comment.id} comment={comment}/>
                        ))
                    }
                </Stack>
            </Grid>
            <ItemDialogsWrapper/>
            <CommonDialog
                title={"Create Comment"}
                maxWidth={"xs"}
                open={commentDialog.create}
                onClose={toggleCreateCommentDialog}
            >
                <CommentForm
                    buttonText={"Create"}
                    buttonIcon={<AddToPhotosIcon/>}
                    onCancelClick={toggleCreateCommentDialog}
                    onSubmit={handleCreateCommentSubmit}
                />
            </CommonDialog>
        </Grid>
    )
}

export default ItemsID