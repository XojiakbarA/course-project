import {Button, Stack, TextField, useMediaQuery} from "@mui/material";
import PasswordIcon from '@mui/icons-material/Password';
import SaveIcon from '@mui/icons-material/Save';
import AvatarUpload from "../commons/AvatarUpload";
import {useFormik} from "formik";
import {useSinglePreview} from "../../hooks/useSinglePreview";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../store/selectors";
import {editUserValidationSchema} from "../../utils/validate";
import {editUser} from "../../store/asyncThunk/authAsyncThunk";
import {appendToFormData} from "../../utils/helpers";
import {LoadingButton} from "@mui/lab";

const UserEditForm = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const dispatch = useDispatch()

    const { getLoading, editLoading, user } = useSelector(authSelector)

    const { handleSubmit, getFieldProps, errors, touched, setValues, setTouched } = useFormik({
        initialValues: {
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            image: null
        },
        enableReinitialize: true,
        validationSchema: editUserValidationSchema,
        onSubmit: (data) => {
            const formData = appendToFormData(data)
            dispatch(editUser({data: formData, id: user.id}))
        }
    })

    const { preview, handleUploadChange, handlePreviewDeleteClick } = useSinglePreview(setValues, setTouched)

    return (
        <form onSubmit={handleSubmit}>
        <Stack spacing={2} alignItems={"center"}>
            <AvatarUpload
                handlePrewiewDeleteClick={handlePreviewDeleteClick}
                handleUploadChange={handleUploadChange}
                handleDeleteImage={ e => setValues(prev => ({ ...prev, image: null })) }
                name='image'
                preview={preview}
                src={user?.image}
                size={isDownSm ? 100 : 120}
                isLoading={getLoading}
                error={ touched.image && Boolean(errors.image) }
                helperText={ touched.image && errors.image }
            />
            <TextField
                fullWidth
                size={isDownSm ? "small" : "medium"}
                variant={"standard"}
                label={"First Name"}
                error={ touched.firstName && Boolean(errors.firstName) }
                helperText={ touched.firstName && errors.firstName }
                { ...getFieldProps('firstName') }
            />
            <TextField
                fullWidth
                size={isDownSm ? "small" : "medium"}
                variant={"standard"}
                label={"Last Name"}
                error={ touched.lastName && Boolean(errors.lastName) }
                helperText={ touched.lastName && errors.lastName }
                { ...getFieldProps('lastName') }
            />
            <TextField
                fullWidth
                size={isDownSm ? "small" : "medium"}
                variant={"standard"}
                label={"Email"}
                value={user?.email ?? ""}
                disabled
            />
            <Stack spacing={2} width={"100%"}>
                <Button
                    color={"secondary"}
                    variant={"outlined"}
                    startIcon={<PasswordIcon/>}
                >
                    Change Password
                </Button>
                <LoadingButton
                    color={"success"}
                    variant={"contained"}
                    startIcon={<SaveIcon/>}
                    type={"submit"}
                    disabled={!Object.keys(touched).length}
                    loading={editLoading}
                >
                    Save
                </LoadingButton>
            </Stack>
        </Stack>
        </form>
    )
}

export default UserEditForm