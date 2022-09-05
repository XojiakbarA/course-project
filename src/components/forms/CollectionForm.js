import {Button, CardMedia, Grid, ListSubheader, Stack, TextField, Typography, useMediaQuery} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import WarningIcon from '@mui/icons-material/Warning';
import {LoadingButton} from "@mui/lab";
import ImageUpload from "../commons/ImageUpload";
import {useSinglePreview} from "../../hooks/useSinglePreview";
import AutocompleteInput from "../inputs/AutocompleteInput";
import {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTopics} from "../../store/asyncThunk/topicsAsyncThunk";
import {authSelector, topicsSelector, usersSelector} from "../../store/selectors";
import {useCollectionFormik} from "../../hooks/useCollectionFormik";
import {toggleDeleteCollectionImage} from "../../store/slices/dialogsSlice";
import {setTopics} from "../../store/slices/topicsSlice";
import {getUsers} from "../../store/asyncThunk/usersAsyncThunk";
import {useLocation} from "react-router";
import {setUsers} from "../../store/slices/usersSlice";
import CollectionCustomFieldInput from "../inputs/CollectionCustomFieldInput";
import {FieldArray, FormikProvider} from "formik";
import {fetchCustomFieldTypes} from "../../api/auth";
import {useTranslation} from "react-i18next";

const CollectionForm = ({ buttonText, buttonIcon, buttonLoading, onSubmit, collection }) => {

    const dispatch = useDispatch()
    const location = useLocation()
    const { t } = useTranslation()
    const isAdminPage = location.pathname.startsWith("/admin")

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const { content: topics, getLoading: topicsGetLoading } = useSelector(topicsSelector)
    const { content: users, getLoading: usersGetLoading } = useSelector(usersSelector)
    const { isAdmin } = useSelector(authSelector)

    const [customFieldTypes, setCustomFieldTypes] = useState({ getLoading: false, data: [] })
    const [gridWidth, setGridWidth] = useState(null)

    const ref = useRef(null)

    useEffect(() => {
        setGridWidth(ref.current.offsetWidth)
        dispatch(getTopics({}))
        dispatch(getUsers({}))
        const getCustomFieldTypes = async () => {
            setCustomFieldTypes(prev => ({ ...prev, getLoading: true }))
            const res = await fetchCustomFieldTypes()
            if (res.status === 200) {
                setCustomFieldTypes({ getLoading: false, data: res.data.data })
            }
        }
        getCustomFieldTypes()
    }, [dispatch])
    useEffect(() => {
        return () => {
            dispatch(setTopics([]))
            dispatch(setUsers([]))
        }
    }, [dispatch])

    const {formik, userValue, topicValue, handleUserChange, handleTopicChange} = useCollectionFormik(onSubmit, collection)

    const {handleSubmit, getFieldProps, handleBlur, errors, touched, values, setValues, setTouched, setFieldValue} = formik

    const { preview, handleUploadChange, handlePreviewDeleteClick } = useSinglePreview(setValues, setTouched)

    const toggleDeleteCollectionImageDialog = () => {
        dispatch(toggleDeleteCollectionImage())
    }

    const setTypeInitValue = (i) => {
        const field = collection?.customFields[i]
        return field?.type
    }

    return (
        <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <Stack spacing={2}>
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
                        <TextField
                            fullWidth
                            size={isDownSm ? "small" : "medium"}
                            variant={"filled"}
                            label={ t("name") }
                            error={ touched.name && Boolean(errors.name) }
                            helperText={ touched.name && errors.name }
                            { ...getFieldProps("name") }
                        />
                        <AutocompleteInput
                            size={isDownSm ? "small" : "medium"}
                            variant={"filled"}
                            label={ t("user") }
                            options={users}
                            value={userValue}
                            loading={usersGetLoading}
                            disabled={usersGetLoading || !isAdmin || !isAdminPage}
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
                            label={ t("topic") }
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
                            label={ t("description") }
                            multiline
                            rows={5}
                            error={ touched.description && Boolean(errors.description) }
                            helperText={ touched.description && errors.description }
                            { ...getFieldProps("description") }
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <ListSubheader sx={{ bgcolor: "transparent", position: "relative" }}>{ t("customFields") }</ListSubheader>
                    {
                        buttonText === t("edit")
                        &&
                        <Stack direction={"row"} spacing={2} alignItems={"center"}>
                            <WarningIcon color={"warning"} fontSize={"small"}/>
                            <Typography variant={"caption"} color={"text.disabled"}>
                                { t("whenChangingCollection") }
                            </Typography>
                        </Stack>
                    }
                    <FieldArray name={"customFields"}>
                        {({ push, remove }) => (
                            <Stack spacing={2}>
                                <Button
                                    startIcon={<AddIcon/>}
                                    onClick={ e => push({ name: "", customFieldTypeId: "" }) }
                                >
                                    { t("createField") }
                                </Button>
                                {
                                    !!values.customFields.length
                                    &&
                                    values.customFields.map((field, i) => (
                                        <CollectionCustomFieldInput
                                            key={i}
                                            index={i}
                                            loading={customFieldTypes.getLoading}
                                            customFieldTypes={customFieldTypes.data}
                                            touched={touched}
                                            errors={errors}
                                            typeInitValue={setTypeInitValue(i)}
                                            getFieldProps={getFieldProps}
                                            handleBlur={handleBlur}
                                            setFieldValue={setFieldValue}
                                            onRemoveClick={ e => remove(i) }
                                        />
                                    ))
                                }
                            </Stack>
                        )}
                    </FieldArray>
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton
                        fullWidth
                        variant={"contained"}
                        size={isDownSm ? "small" : "medium"}
                        startIcon={buttonIcon}
                        type={"submit"}
                        loading={buttonLoading || usersGetLoading || topicsGetLoading}
                    >
                        { buttonText }
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
        </FormikProvider>
    )
}

export default CollectionForm