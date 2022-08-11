import {Stack, TextField, useMediaQuery} from "@mui/material";
import PasswordInput from "../inputs/PasswordInput";
import {LoadingButton} from "@mui/lab";
import AvatarUpload from "../commons/AvatarUpload";
import {useSinglePreview} from "../../hooks/useSinglePreview";
import {useFormik} from "formik";
import {registerValidationSchema} from "../../utils/validate";
import {appendToFormData} from "../../utils/converters";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../store/asyncThunk/userAsyncThunk";
import {authSelector} from "../../store/selectors";

const RegisterForm = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const dispatch = useDispatch()

    const { authLoading } = useSelector(authSelector)

    const { handleSubmit, setValues, touched, errors, getFieldProps } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            image: null
        },
        enableReinitialize: true,
        validationSchema: registerValidationSchema,
        onSubmit: (data) => {
            const formData = appendToFormData(data)
            dispatch(register({ data: formData }))
        }
    })

    const { preview, handleUploadChange, handlePreviewDeleteClick } = useSinglePreview(setValues)

    return (
        <form onSubmit={handleSubmit}>
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
                error={ touched.firstName && Boolean(errors.firstName) }
                helperText={ touched.firstName && errors.firstName }
                { ...getFieldProps('firstName') }
            />
            <TextField
                fullWidth
                size={isDownSm ? "small" : "medium"}
                variant={"filled"}
                label={"Last Name"}
                error={ touched.lastName && Boolean(errors.lastName) }
                helperText={ touched.lastName && errors.lastName }
                { ...getFieldProps('lastName') }
            />
            <TextField
                fullWidth
                size={isDownSm ? "small" : "medium"}
                variant={"filled"}
                label={"Email"}
                error={ touched.email && Boolean(errors.email) }
                helperText={ touched.email && errors.email }
                { ...getFieldProps('email') }
            />
            <PasswordInput
                fullWidth
                size={isDownSm ? "small" : "medium"}
                label={"Password"}
                error={ touched.password && Boolean(errors.password) }
                helperText={ touched.password && errors.password }
                { ...getFieldProps('password') }
            />
            <PasswordInput
                fullWidth
                size={isDownSm ? "small" : "medium"}
                label={"Confirm Password"}
                error={ touched.confirmPassword && Boolean(errors.confirmPassword) }
                helperText={ touched.confirmPassword && errors.confirmPassword }
                { ...getFieldProps('confirmPassword') }
            />
            <LoadingButton
                fullWidth
                variant={"contained"}
                size={isDownSm ? "small" : "medium"}
                type={"submit"}
                loading={authLoading}
            >
                Register
            </LoadingButton>
        </Stack>
        </form>
    )
}

export default RegisterForm