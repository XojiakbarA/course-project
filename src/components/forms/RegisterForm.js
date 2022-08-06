import {Stack, TextField, useMediaQuery} from "@mui/material";
import PasswordInput from "../inputs/PasswordInput";
import {LoadingButton} from "@mui/lab";
import AvatarUpload from "../commons/AvatarUpload";
import {useSinglePreview} from "../../hooks/useSinglePreview";
import {useFormik} from "formik";

const RegisterForm = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const { setValues } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            image: null
        }
    })

    const { preview, handleUploadChange, handlePreviewDeleteClick } = useSinglePreview(setValues)

    return (
        <form>
        <Stack spacing={2} alignItems={"center"}>
            <AvatarUpload
                handlePrewiewDeleteClick={handlePreviewDeleteClick}
                handleUploadChange={handleUploadChange}
                handleDeleteImage={ e => setValues(prev => ({ ...prev, image: null })) }
                name='image'
                preview={preview}
                size={isDownSm ? 60 : 70}
            />
            <TextField
                fullWidth
                size={isDownSm ? "small" : "medium"}
                variant={"filled"}
                label={"First Name"}
            />
            <TextField
                fullWidth
                size={isDownSm ? "small" : "medium"}
                variant={"filled"}
                label={"Last Name"}
            />
            <TextField
                fullWidth
                size={isDownSm ? "small" : "medium"}
                variant={"filled"}
                label={"Email"}
            />
            <PasswordInput
                fullWidth
                size={isDownSm ? "small" : "medium"}
                label={"Password"}
            />
            <PasswordInput
                fullWidth
                size={isDownSm ? "small" : "medium"}
                label={"Confirm Password"}
            />
            <LoadingButton
                fullWidth
                variant={"contained"}
            >
                Register
            </LoadingButton>
        </Stack>
        </form>
    )
}

export default RegisterForm