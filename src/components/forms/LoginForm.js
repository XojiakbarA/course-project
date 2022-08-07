import {
    Checkbox,
    Chip,
    Divider,
    FormControlLabel,
    Stack,
    TextField,
    useMediaQuery
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import SocialLoginButtons from "../commons/SocialLoginButtons";
import PasswordInput from "../inputs/PasswordInput";

const LoginForm = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <form>
        <Stack spacing={2}>
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
            <FormControlLabel
                label={"Remember Me"}
                control={<Checkbox/>}
            />
            <LoadingButton
                fullWidth
                variant={"contained"}
                size={isDownSm ? "small" : "medium"}
            >
                Login
            </LoadingButton>
            <Divider><Chip label={"OR"} size={"small"}/></Divider>
            <SocialLoginButtons/>
        </Stack>
        </form>
    )
}

export default LoginForm