import AvatarUpload from "../commons/AvatarUpload";
import {useFormik} from "formik";
import {editImageValidationSchema} from "../../utils/validate";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../store/selectors";
import {Avatar, FormHelperText, Stack, useMediaQuery} from "@mui/material";
import CommonDialog from "../dialogs/CommonDialog";
import {useState} from "react";
import {deleteUserImage, editUserImage} from "../../store/asyncThunk/authAsyncThunk";
import {LoadingButton} from "@mui/lab";
import ConfirmDialog from "../dialogs/ConfirmDialog";

const UserImageEditForm = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const dispatch = useDispatch()

    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [preview, setPreview] = useState(null)

    const { getLoading, deleteImageLoading, editImageLoading, user } = useSelector(authSelector)

    const { setValues, setTouched, touched, errors, submitForm } = useFormik({
        initialValues: { image: null },
        enableReinitialize: true,
        validationSchema: editImageValidationSchema,
        onSubmit: (data) => {
            const formData = new FormData()
            formData.append("image", data.image)
            dispatch(editUserImage({ userId: user.id, imageId: user?.image?.id, data: formData, setEditOpen }))
        }
    })

    const handleUploadChange = (e) => {
        const image = e.target.files[0]
        const url = URL.createObjectURL(image)
        setTouched({ image: true })
        setValues({ image })
        setPreview(url)
        setEditOpen(true)
    }
    const handleEditClose = () => {
        setEditOpen(false)
        setValues({ image: null })
    }
    const handleEditClick = async () => {
        await submitForm()
    }
    const handleDeleteClose = () => {
        setDeleteOpen(false)
    }
    const handleDeleteClick = () => {
        setDeleteOpen(true)
    }
    const handleConfirmClick = () => {
        dispatch(deleteUserImage({ userId: user?.id, imageId: user?.image?.id, setDeleteOpen }))
    }

    return (
        <div>
            <AvatarUpload
                handleUploadChange={handleUploadChange}
                handleDeleteImage={handleDeleteClick}
                name='image'
                src={user?.image?.value}
                size={isDownSm ? 100 : 120}
                isLoading={getLoading}
            />
            <CommonDialog
                title={"Edit Image"}
                maxWidth={"xs"}
                open={editOpen}
                onClose={handleEditClose}
            >
                <Stack spacing={2} alignItems={"center"}>
                    <Avatar src={preview} sx={{ width: 300, height: 300, border: errors.image ? "1px solid red" : "0px" }}/>
                    <FormHelperText error>{ touched.image && errors.image }</FormHelperText>
                    <LoadingButton
                        onClick={handleEditClick}
                        disabled={ !!Object.keys(errors).length }
                        loading={editImageLoading}
                    >
                        Set Image
                    </LoadingButton>
                </Stack>
            </CommonDialog>
            <ConfirmDialog
                open={deleteOpen}
                onClose={handleDeleteClose}
                onConfirmClick={handleConfirmClick}
                loading={deleteImageLoading}
                content={"Do you really want to delete the image?"}
            />
        </div>
    )
}

export default UserImageEditForm