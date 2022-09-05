import {IconButton, Link, Stack, Tooltip} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from "../icons/GoogleIcon";
import FacebookIcon from "../icons/FacebookIcon"
import {FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL, GITHUB_AUTH_URL} from "../../utils/constants";

const SocialLoginButtons = ({ disabled }) => {

    return (
        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={2}>
            <Tooltip title={"Google"}>
                <IconButton
                    size={"large"}
                    color={"error"}
                    disabled={disabled}
                    component={Link}
                    href={GOOGLE_AUTH_URL}
                >
                    <GoogleIcon color={"inherit"} fontSize={"inherit"}/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Facebook"}>
                <IconButton
                    size={"large"}
                    color={"primary"}
                    disabled={disabled}
                    component={Link}
                    href={FACEBOOK_AUTH_URL}
                >
                    <FacebookIcon color={"inherit"} fontSize={"inherit"}/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Github"}>
                <IconButton
                    size={"large"}
                    color={"inherit"}
                    disabled={disabled}
                    component={Link}
                    href={GITHUB_AUTH_URL}
                >
                    <GitHubIcon color={"inherit"} fontSize={"inherit"}/>
                </IconButton>
            </Tooltip>
        </Stack>
    )
}

export default SocialLoginButtons