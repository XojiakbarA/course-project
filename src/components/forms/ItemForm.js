import {CardMedia, Grid, ListSubheader, Stack, TextField, useMediaQuery} from "@mui/material";
import ImageUpload from "../commons/ImageUpload";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSinglePreview} from "../../hooks/useSinglePreview";
import {useItemFormik} from "../../hooks/useItemFormik";
import {isAdmin} from "../../utils/helpers";
import AutocompleteInput from "../inputs/AutocompleteInput";
import {authSelector, collectionsSelector, tagsSelector} from "../../store/selectors";
import {LoadingButton} from "@mui/lab";
import {toggleDeleteItemImage} from "../../store/slices/dialogsSlice";
import {getCollections} from "../../store/asyncThunk/collectionsAsyncThunk";
import {setCollections} from "../../store/slices/collectionsSlice";
import {useLocation} from "react-router";
import ItemCustomFieldInput from "../inputs/ItemCustomFieldInput";
import {getTags} from "../../store/asyncThunk/tagsAsyncThunk";
import {setTags} from "../../store/slices/tagsSlice";

const ItemForm = ({ buttonText, buttonIcon, buttonLoading, onSubmit, item }) => {

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
        dispatch(getTags({}))
        setGridWidth(ref.current.offsetWidth)
        return () => {
            dispatch(setCollections([]))
            dispatch(setTags([]))
        }
    }, [dispatch])

    const {
        handleSubmit, getFieldProps, handleBlur, errors, touched, values, setTouched, setValues, setFieldValue,
        collectionValue, tagsValue, handleCollectionChange, handleTagsChange
    } = useItemFormik(onSubmit, item)

    const { preview, handleUploadChange, handlePreviewDeleteClick } = useSinglePreview(setValues, setTouched)

    const toggleDeleteItemImageDialog = () => {
        dispatch(toggleDeleteItemImage())
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <Stack spacing={2}>
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
                    </Stack>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <ListSubheader sx={{ bgcolor: "transparent", position: "relative" }}>Custom Fields</ListSubheader>
                    <ItemCustomFieldInput
                        customValues={values.customValues}
                        collectionValue={collectionValue}
                        touched={touched}
                        errors={errors}
                        getFieldProps={getFieldProps}
                        setFieldValue={setFieldValue}
                    />
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton
                        fullWidth
                        variant={"contained"}
                        size={isDownSm ? "small" : "medium"}
                        startIcon={buttonIcon}
                        type={"submit"}
                        loading={buttonLoading}
                    >
                        { buttonText }
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    )
}

export default ItemForm