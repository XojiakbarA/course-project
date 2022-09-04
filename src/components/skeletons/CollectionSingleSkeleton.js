import {
    Box,
    Breadcrumbs,
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton, Skeleton,
    Stack, SvgIcon,
    Typography, useMediaQuery
} from "@mui/material";
import AvatarImage from "../images/AvatarImage";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EventIcon from "@mui/icons-material/Event";

const CollectionSingleSkeleton = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Card>
            <Grid container>
                <Grid item xs={12} md={5} lg={4} >
                    <Skeleton variant={"rectangular"} animation={"wave"} height={250}/>
                </Grid>
                <Grid item xs={12} md={7} lg={8}>
                    <CardContent>
                        <Stack direction={"row"} spacing={1} justifyContent={"end"} alignItems={"center"}>
                            <IconButton disabled><SvgIcon/></IconButton>
                        </Stack>
                        <Stack spacing={1}>
                            <Stack direction={"row"} spacing={1} alignItems={"end"}>
                                <Breadcrumbs>
                                    <Typography variant={isDownSm ? "body1" : "h6"}>
                                        <Skeleton width={120}/>
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
                                    <AvatarImage size={isDownSm ? 30 : 40}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>User</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"}>
                                            <Skeleton width={80}/>
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                    <AttachFileIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>Items</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"}>0</Typography>
                                    </Box>
                                </Stack>
                                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                    <EventIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>Created at</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"} whiteSpace={"nowrap"}>
                                            <Skeleton width={180}/>
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                            <Typography variant={"body2"}>
                                <Skeleton width={"100%"}/>
                                <Skeleton width={"80%"}/>
                            </Typography>
                        </Stack>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    )
}

export default CollectionSingleSkeleton