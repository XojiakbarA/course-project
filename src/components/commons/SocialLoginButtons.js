import {Button, Stack} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const SocialLoginButtons = ({ disabled }) => {

    return (
        <Stack spacing={2}>
            <Button
                startIcon={<GoogleIcon color={"action"}/>}
                variant={"outlined"}
                color={"inherit"}
                disabled={disabled}
            >
                Login with Google
            </Button>
            <Button
                startIcon={<FacebookIcon color={"primary"}/>}
                variant={"outlined"}
                color={"primary"}
                disabled={disabled}
            >
                Login with Facebook
            </Button>
        </Stack>
    )
}

export default SocialLoginButtons