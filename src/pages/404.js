import {Box, Button, Divider, Stack, Typography, useMediaQuery} from "@mui/material";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

const NotFound = () => {

    const navigate = useNavigate()
    const { t } = useTranslation()
    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Box width={"100%"} height={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Stack spacing={2}>
                <Stack direction={"row"} spacing={2} divider={<Divider orientation={"vertical"} flexItem/>}>
                    <Typography variant={isDownSm ? "h5" : "h4"} color={"primary.main"}>404</Typography>
                    <Typography variant={isDownSm ? "h5" : "h4"}>{ t("notFound") }</Typography>
                </Stack>
                <Button variant={"outlined"} onClick={ e => navigate(-1) }>{ t("goBack") }</Button>
            </Stack>
        </Box>
    )
}

export default NotFound