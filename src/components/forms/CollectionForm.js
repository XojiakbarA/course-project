import {Button, CardMedia, Grid, Stack, TextField, useMediaQuery} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import {LoadingButton} from "@mui/lab";
import ImageUpload from "../commons/ImageUpload";
import {useSinglePreview} from "../../hooks/useSinglePreview";
import AutocompleteInput from "../inputs/AutocompleteInput";
import {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTopics} from "../../store/asyncThunk/topicsAsyncThunk";
import {authSelector, topicsSelector, usersSelector} from "../../store/selectors";
import {isAdmin} from "../../utils/helpers";
import {useCollectionFormik} from "../../hooks/useCollectionFormik";
import {toggleDeleteCollectionImage} from "../../store/slices/dialogsSlice";
import {setTopics} from "../../store/slices/topicsSlice";
import {getUsers} from "../../store/asyncThunk/usersAsyncThunk";
import {useLocation} from "react-router";
import {setUsers} from "../../store/slices/usersSlice";

const CollectionForm = ({ buttonText, buttonIcon, buttonLoading, onCancelClick, onSumbit, collection }) => {

    const dispatch = useDispatch()
    const location = useLocation()
    const isAdminPage = location.pathname.startsWith("/admin")

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const { content: topics, getLoading: topicsGetLoading } = useSelector(topicsSelector)
    const { content: users, getLoading: usersGetLoading } = useSelector(usersSelector)
    const { user } = useSelector(authSelector)

    const [gridWidth, setGridWidth] = useState(null)

    const ref = useRef(null)

    useEffect(() => {
        setGridWidth(ref.current.offsetWidth)
        dispatch(getTopics({}))
        dispatch(getUsers({}))
    }, [dispatch])
    useEffect(() => {
        return () => {
            dispatch(setTopics([]))
            dispatch(setUsers([]))
        }
    }, [dispatch])

    const {
        handleSubmit, getFieldProps, handleBlur, errors, touched,
        setValues, setTouched, userValue, topicValue, handleUserChange, handleTopicChange
    } = useCollectionFormik(onSumbit, collection)

    const { preview, handleUploadChange, handlePreviewDeleteClick } = useSinglePreview(setValues, setTouched)

    const toggleDeleteCollectionImageDialog = () => {
        dispatch(toggleDeleteCollectionImage())
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6} >
                    <CardMedia ref={ref}>
                        <ImageUpload
                            handlePrewiewDeleteClick={handlePreviewDeleteClick}
                            handleUploadChange={handleUploadChange}
                            handleDeleteImage={toggleDeleteCollectionImageDialog}
                            name='image'
                            preview={preview}
                            src={collection?.image?.value}
                            width={gridWidth}
                            height={200}
                            error={ Boolean(errors.image) }
                            helperText={ errors.image }
                        />
                    </CardMedia>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            size={isDownSm ? "small" : "medium"}
                            variant={"filled"}
                            label={"Name"}
                            error={ touched.name && Boolean(errors.name) }
                            helperText={ touched.name && errors.name }
                            { ...getFieldProps("name") }
                        />
                        <AutocompleteInput
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
                            size={isDownSm ? "small" : "medium"}
                            variant={"filled"}
                            label={"Topic"}
                            options={topics}
                            value={topicValue}
                            loading={topicsGetLoading}
                            disabled={topicsGetLoading}
                            name="topicId"
                            onChange={handleTopicChange}
                            onBlur={handleBlur}
                            error={ touched.topicId && Boolean(errors.topicId) }
                            helperText={ touched.topicId && errors.topicId }
                            getOptionLabel={option => option.name}
                        />
                        <TextField
                            fullWidth
                            size={isDownSm ? "small" : "medium"}
                            variant={"filled"}
                            label={"Description"}
                            multiline
                            rows={5}
                            error={ touched.description && Boolean(errors.description) }
                            helperText={ touched.description && errors.description }
                            { ...getFieldProps("description") }
                        />
                        <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
                            <Button
                                variant={"outlined"}
                                size={isDownSm ? "small" : "medium"}
                                startIcon={<CancelIcon/>}
                                onClick={onCancelClick}
                            >
                                Cancel
                            </Button>
                            <LoadingButton
                                variant={"contained"}
                                size={isDownSm ? "small" : "medium"}
                                startIcon={buttonIcon}
                                type={"submit"}
                                loading={buttonLoading}
                            >
                                { buttonText }
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    )
}

export default CollectionForm