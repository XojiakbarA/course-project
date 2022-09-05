import {
    Card, CardActionArea,
    CardActions,
    CardContent,
    IconButton,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";
import {useLocation} from "react-router";
import {useTranslation} from "react-i18next";

const CollectionListSkeleton = ({ sx }) => {

    const location = useLocation()
    const { t } = useTranslation()

    return (
        <Card sx={sx ?? { position: "relative", height: "100%" }}>
            <CardActionArea sx={{ pb: 5, height: "100%" }}>
            <Skeleton variant={"rectangular"} height={194} animation={"wave"}/>
            <CardContent>
                <Typography variant={"h5"}><Skeleton width={200}/></Typography>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography gutterBottom><Skeleton width={120}/></Typography>
                    <Typography color={"secondary.dark"}>0 { t("items") }</Typography>
                </Stack>
                <Typography variant={"body2"}><Skeleton variant={"text"}/></Typography>
            </CardContent>
            </CardActionArea>
            <CardActions sx={{ position: "absolute", bottom: 0, left: 0, width: "100%", display: "flex", justifyContent: "flex-end"}}>
                {
                    location.pathname === "/my-collections"
                    &&
                    <>
                    <IconButton disabled>
                        <Skeleton variant={"circular"} width={24} height={24}/>
                    </IconButton>
                    <IconButton disabled>
                        <Skeleton variant={"circular"} width={24} height={24}/>
                    </IconButton>
                    </>
                }
            </CardActions>
        </Card>
    )
}

export default CollectionListSkeleton