import {Stack, Typography} from "@mui/material";

const PageTitle = ({ icon, text, variant, color }) => {

    return (
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
            { icon }
            <Typography variant={variant} color={color}>{ text }</Typography>
        </Stack>
    )
}

export default PageTitle