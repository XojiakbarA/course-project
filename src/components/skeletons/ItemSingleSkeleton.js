import {
    Avatar, Box,
    Breadcrumbs, Card,
    CardContent, Chip,
    Divider,
    Grid,
    IconButton,
    Rating, Skeleton,
    Stack, SvgIcon,
    Typography, useMediaQuery
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import EventIcon from "@mui/icons-material/Event";
import TagIcon from "@mui/icons-material/Tag";

const ItemSingleSkeleton = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Card>
            <Grid container>
                <Grid item xs={12} md={5} lg={4}>
                    <Skeleton variant={"rectangular"} animation={"wave"} height={250}/>
                </Grid>
                <Grid item xs={12} md={7} lg={8}>
                    <CardContent>
                        <Stack direction={"row"} spacing={1} justifyContent={"end"} alignItems={"center"}>
                            <IconButton disabled><SvgIcon/></IconButton>
                            <Rating readOnly/>
                        </Stack>
                        <Stack spacing={1}>
                            <Stack direction={"row"} spacing={1} alignItems={"end"}>
                                <Breadcrumbs>
                                    <Typography variant={isDownSm ? "body1" : "h6"} color={"text.disabled"}>
                                        <Skeleton width={120}/>
                                    </Typography>
                                    <Typography variant={isDownSm ? "body1" : "h6"} color={"text.disabled"}>
                                        <Skeleton width={150}/>
                                    </Typography>
                                    <Typography variant={isDownSm ? "h5" : "h4"}>
                                        <Skeleton width={200}/>
                                    </Typography>
                                </Breadcrumbs>
                            </Stack>
                            <Stack
                                direction={"row"}
                                spacing={4}
                                overflow={"scroll"}
                                pb={1}
                                divider={<Divider orientation={"vertical"} flexItem/>}
                            >
                                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                    <Avatar sx={{ width: isDownSm ? 30 : 40, height: isDownSm ? 30 : 40 }}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>User</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"}>
                                            <Skeleton width={80}/>
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                    <ThumbUpIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>Likes</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"}>0</Typography>
                                    </Box>
                                </Stack>
                                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                    <CommentIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>Comments</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"}>0</Typography>
                                    </Box>
                                </Stack>
                                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                    <EventIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>Created at</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"}>
                                            <Skeleton width={180}/>
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                <TagIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                                <Box>
                                    <Typography variant={"caption"} color={"primary"}>Tags</Typography>
                                    <Stack direction={"row"} spacing={1}>
                                        {
                                            [1, 2, 3, 4, 5].map(tag => (
                                                <Chip key={tag} label={<Skeleton width={40}/>} size={"small"} sx={{ mb: 1, mr: 1 }}/>
                                            ))
                                        }
                                    </Stack>
                                </Box>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    )
}

export default ItemSingleSkeleton