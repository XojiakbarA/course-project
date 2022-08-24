import {
    Box,
    Card, CardActionArea,
    CardActions,
    CardContent,
    Chip,
    IconButton,
    Rating,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";

const ItemListSkeleton = ({ sx }) => {

    return (
        <Card sx={sx ?? { position: "relative", height: "100%" }}>
            <CardActionArea disabled sx={{ pb: 5, height: "100%" }}>
            <Skeleton variant={"rectangular"} height={194} animation={"wave"}/>
            <CardContent>
                <Stack spacing={2}>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Stack>
                            <Typography variant={"h5"}><Skeleton width={120}/></Typography>
                            <Typography><Skeleton width={70}/></Typography>
                        </Stack>
                        <Stack spacing={1} alignItems={"end"}>
                            <Rating readOnly size={"small"}/>
                            <Stack direction={"row"} spacing={2}>
                                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                                    <ThumbUpIcon fontSize={"small"} color={"disabled"}/>
                                    <Typography variant={"body2"}>0</Typography>
                                </Stack>
                                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                                    <CommentIcon fontSize={"small"} color={"disabled"}/>
                                    <Typography variant={"body2"}>0</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Box display={"flex"}>
                        {
                            [1, 2, 3, 4, 5].map(tag => (
                                <Chip key={tag} label={<Skeleton width={30}/>} size={"small"} sx={{ mb: 1, mr: 1 }}/>
                            ))
                        }
                    </Box>
                </Stack>
            </CardContent>
            </CardActionArea>
            <CardActions sx={{ position: "absolute", bottom: 0, left: 0, width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <IconButton disabled>
                    <Skeleton variant={"circular"} width={24} height={24}/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default ItemListSkeleton