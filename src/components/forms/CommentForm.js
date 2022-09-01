import {FormControl, InputLabel, Rating, Stack, TextField, useMediaQuery} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {authSelector, itemsSelector, usersSelector} from "../../store/selectors";
import {useLocation} from "react-router";
import {LoadingButton} from "@mui/lab";
import {isAdmin} from "../../utils/helpers";
import AutocompleteInput from "../inputs/AutocompleteInput";
import {useEffect} from "react";
import {getUsers} from "../../store/asyncThunk/usersAsyncThunk";
import {setUsers} from "../../store/slices/usersSlice";
import {getItems} from "../../store/asyncThunk/itemsAsyncThunk";
import {setItems} from "../../store/slices/itemsSlice";
import {useCommentFormik} from "../../hooks/useCommentFormik";

const CommentForm = ({ buttonIcon, buttonLoading, buttonText, onSubmit, comment }) => {

    const dispatch = useDispatch()
    const location = useLocation()
    const isAdminPage = location.pathname.startsWith("/admin")

    const { user } = useSelector(authSelector)
    const { content: users, getLoading: usersGetLoading } = useSelector(usersSelector)
    const { content: items, getLoading: itemsGetLoading } = useSelector(itemsSelector)

    useEffect(() => {
        dispatch(getUsers({}))
        dispatch(getItems({}))
    }, [dispatch])
    useEffect(() => {
        return () => {
            dispatch(setUsers([]))
            dispatch(setItems([]))
        }
    }, [dispatch])

    const {
        handleSubmit, handleChange, handleBlur, handleUserChange, handleItemChange,
        getFieldProps, userValue, itemValue, values, touched, errors
    } = useCommentFormik(onSubmit, comment)

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2} alignItems={"end"}>
                <AutocompleteInput
                    fullWidth
                    size={isDownSm ? "small" : "medium"}
                    variant={"filled"}
                    label={"User"}
                    options={users}
                    value={userValue}
                    loading={usersGetLoading}
                    disabled={usersGetLoading || !isAdmin(user) || !isAdminPage}
                    name="userId"
                    onChange={handleUserChange}
                    onBlur={handleBlur}
                    error={ touched.userId && Boolean(errors.userId) }
                    helperText={ touched.userId && errors.userId }
                    getOptionLabel={option => option.firstName}
                />
                <AutocompleteInput
                    fullWidth
                    size={isDownSm ? "small" : "medium"}
                    variant={"filled"}
                    label={"Item"}
                    options={items}
                    value={itemValue}
                    loading={itemsGetLoading}
                    disabled={itemsGetLoading || !isAdmin(user) || !isAdminPage}
                    name="itemId"
                    onChange={handleItemChange}
                    onBlur={handleBlur}
                    error={ touched.itemId && Boolean(errors.itemId) }
                    helperText={ touched.itemId && errors.itemId }
                    getOptionLabel={option => option.name}
                />
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
                <LoadingButton
                    variant={"contained"}
                    size={isDownSm ? "small" : "medium"}
                    startIcon={buttonIcon}
                    loading={buttonLoading}
                    type={"submit"}
                >
                    { buttonText }
                </LoadingButton>
            </Stack>
        </form>
    )
}

export default CommentForm