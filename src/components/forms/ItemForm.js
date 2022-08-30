import {Button, CardMedia, Grid, Stack, TextField, useMediaQuery} from "@mui/material";
import ImageUpload from "../commons/ImageUpload";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSinglePreview} from "../../hooks/useSinglePreview";
import {useItemFormik} from "../../hooks/useItemFormik";
import {isAdmin} from "../../utils/helpers";
import AutocompleteInput from "../inputs/AutocompleteInput";
import {authSelector, collectionsSelector, tagsSelector} from "../../store/selectors";
import CancelIcon from "@mui/icons-material/Cancel";
import {LoadingButton} from "@mui/lab";
import {toggleDeleteItemImage} from "../../store/slices/dialogsSlice";
import {getTags} from "../../store/asyncThunk/tagsAsyncThunk";
import {setTags} from "../../store/slices/tagsSlice";
import {getCollections} from "../../store/asyncThunk/collectionsAsyncThunk";
import {setCollections} from "../../store/slices/collectionsSlice";
import {useLocation} from "react-router";

const ItemForm = ({ buttonText, buttonIcon, buttonLoading, onCancelClick, onSubmit, item }) => {

    const dispatch = useDispatch()
    const location = useLocation()
    const isAdminPage = location.pathname.startsWith("/admin")

    const { content: collections, getLoading: collectionsGetLoading } = useSelector(collectionsSelector)
    const { content: tags, getLoading: tagsGetLoading } = useSelector(tagsSelector)
    const { user } = useSelector(authSelector)

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const [gridWidth, setGridWidth] = useState(null)

    const ref = useRef(null)

    useEffect(() => {
        dispatch(getCollections({}))
        dispatch(getTags())
        setGridWidth(ref.current.offsetWidth)
        return () => {
            dispatch(setCollections([]))
            dispatch(setTags([]))
        }
    }, [dispatch])

    const {
        handleSubmit, getFieldProps, handleBlur, errors, touched,
        setTouched, setValues, collectionValue, tagsValue, handleCollectionChange, handleTagsChange
    } = useItemFormik(onSubmit, item)

    const { preview, handleUploadChange, handlePreviewDeleteClick } = useSinglePreview(setValues, setTouched)

    const toggleDeleteItemImageDialog = () => {
        dispatch(toggleDeleteItemImage())
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6} >
                    <CardMedia ref={ref}>
                        <ImageUpload
                            handlePrewiewDeleteClick={handlePreviewDeleteClick}
                            handleUploadChange={handleUploadChange}
                            handleDeleteImage={toggleDeleteItemImageDialog}
                            name='image'
                            preview={preview}
                            src={item?.image?.value}
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
                            label={"Collection"}
                            options={collections}
                            value={collectionValue}
                            loading={collectionsGetLoading}
                            disabled={collectionsGetLoading || !isAdmin(user) || !isAdminPage}
                            name="collectionId"
                            onChange={handleCollectionChange}
                            onBlur={handleBlur}
                            error={ touched.collectionId && Boolean(errors.collectionId) }
                            helperText={ touched.collectionId && errors.collectionId }
                            getOptionLabel={option => option.name}
                        />
                        <AutocompleteInput
                            multiple
                            size={isDownSm ? "small" : "medium"}
                            variant={"filled"}
                            label={"Tags"}
                            options={tags}
                            value={tagsValue}
                            loading={tagsGetLoading}
                            disabled={tagsGetLoading}
                            name="tagIds"
                            onChange={handleTagsChange}
                            onBlur={handleBlur}
                            error={ touched.tagIds && Boolean(errors.tagIds) }
                            helperText={ touched.tagIds && errors.tagIds }
                            getOptionLabel={option => option.name}
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

export default ItemForm