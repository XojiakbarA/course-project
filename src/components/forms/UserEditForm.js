import {Button, Stack, TextField, useMediaQuery} from "@mui/material";
import PasswordIcon from '@mui/icons-material/Password';
import SaveIcon from '@mui/icons-material/Save';
import AvatarUpload from "../commons/AvatarUpload";
import {useFormik} from "formik";
import {useSinglePreview} from "../../hooks/useSinglePreview";

const UserEditForm = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const { setValues } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
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
                size={isDownSm ? 100 : 120}
            />
            <TextField
                fullWidth
                size={isDownSm ? "small" : "medium"}
                variant={"standard"}
                label={"First Name"}
                value={"Xojiakbar"}
            />
            <TextField
                fullWidth
                size={isDownSm ? "small" : "medium"}
                variant={"standard"}
                label={"Last Name"}
                value={"Akramov"}
            />
            <TextField
                fullWidth
                size={isDownSm ? "small" : "medium"}
                variant={"standard"}
                label={"Email"}
                value={"xoji@mail.ru"}
            />
            <Stack spacing={2} width={"100%"}>
                <Button
                    color={"secondary"}
                    variant={"outlined"}
                    startIcon={<PasswordIcon/>}
                >
                    Change Password
                </Button>
                <Button
                    color={"success"}
                    variant={"contained"}
                    startIcon={<SaveIcon/>}
                    disabled
                >
                    Save
                </Button>
            </Stack>
        </Stack>
        </form>
    )
}

export default UserEditForm