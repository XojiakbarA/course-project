import {
    Chip,
    Divider,
    Stack,
    TextField,
    useMediaQuery
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import SocialLoginButtons from "../commons/SocialLoginButtons";
import PasswordInput from "../inputs/PasswordInput";
import {useFormik} from "formik";
import {loginValidationSchema} from "../../utils/validate";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/asyncThunk/authAsyncThunk";
import {authSelector} from "../../store/selectors";

const LoginForm = () => {

    const dispatch = useDispatch()

    const { authLoading } = useSelector(authSelector)

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const { handleSubmit, touched, errors, getFieldProps } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        enableReinitialize: true,
        validationSchema: loginValidationSchema,
        onSubmit: (data) => {
            dispatch(login({data}))
        }
    })

    return (
        <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
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
            <LoadingButton
                fullWidth
                variant={"contained"}
                size={isDownSm ? "small" : "medium"}
                type={"submit"}
                loading={authLoading}
            >
                Login
            </LoadingButton>
            <Divider><Chip label={"OR LOGIN WITH"} size={"small"}/></Divider>
            <SocialLoginButtons disabled={authLoading}/>
        </Stack>
        </form>
    )
}

export default LoginForm