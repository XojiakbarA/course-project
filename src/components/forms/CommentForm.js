import {Button, FormControl, InputLabel, Rating, Stack, TextField, useMediaQuery} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {useFormik} from "formik";
import {commentValidationSchema} from "../../utils/validate";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../store/selectors";
import {useParams} from "react-router";
import {useStompClient, useSubscription} from "react-stomp-hooks";
import {setSnackbar} from "../../store/slices/snackbarSlice";
import {addComment} from "../../store/slices/commentsSlice";

const CommentForm = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const dispatch = useDispatch()

    const { user } = useSelector(authSelector)
    const { id } = useParams()

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

    const { handleSubmit, handleBlur, handleChange, getFieldProps, touched, errors, values } = useFormik({
        initialValues: {
            userId: user?.id ?? "",
            itemId: id ?? "",
            rating: 0,
            text: ""
        },
        enableReinitialize: true,
        validationSchema: commentValidationSchema,
        onSubmit: (data, { resetForm }) => {
            client.publish({ destination: "/app/comments/create", body: JSON.stringify(data) })
            resetForm()
        }
    })

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2} alignItems={"end"}>
                <FormControl variant={"standard"}>
                    <InputLabel shrink htmlFor={"rating"}>Rating</InputLabel>
                    <Rating
                        sx={{ pt: 2 }}
                        name={"rating"}
                        value={Number(values.rating)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </FormControl>
                <TextField
                    fullWidth
                    variant={"filled"}
                    label={"Comment"}
                    multiline
                    rows={5}
                    error={ touched.text && Boolean(errors.text) }
                    helperText={ touched.text && errors.text }
                    { ...getFieldProps("text") }
                />
                <Button
                    variant={"contained"}
                    size={isDownSm ? "small" : "medium"}
                    startIcon={<SendIcon/>}
                    type={"submit"}
                >
                    Send
                </Button>
            </Stack>
        </form>
    )
}

export default CommentForm