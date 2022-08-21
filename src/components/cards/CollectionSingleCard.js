import {
    Box, Breadcrumbs,
    Card,
    CardContent,
    Divider, Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useMediaQuery
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EventIcon from "@mui/icons-material/Event";
import CardImage from "../images/CardImage";
import {useEffect, useRef, useState} from "react";
import AvatarImage from "../images/AvatarImage";

const CollectionSingleCard = ({ collection, onEditClick, onDeleteClick }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const ref = useRef(null)

    const [cardWidth, setCardWidth] = useState(null)

    useEffect(() => {
        setCardWidth(ref.current.offsetWidth)
    }, [])

    return (
        <Card>
            <Grid container>
                <Grid item xs={12} md={5} lg={4} ref={ref}>
                    <CardImage publicId={collection?.image?.value} width={cardWidth} height={250}/>
                </Grid>
                <Grid item xs={12} md={7} lg={8}>
                    <CardContent>
                        <Stack direction={"row"} spacing={1} justifyContent={"end"} alignItems={"center"}>
                            <Tooltip title={"Edit"}>
                                <IconButton onClick={onEditClick}>
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Delete"}>
                                <IconButton onClick={onDeleteClick}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <Stack spacing={2}>
                            <Stack direction={"row"} justifyContent={"space-between"}>
                                <Stack direction={"row"} spacing={1} alignItems={"end"}>
                                    <Breadcrumbs>
                                        <Typography variant={isDownSm ? "body1" : "h6"} color={"text.disabled"}>{ collection?.topic.name }</Typography>
                                        <Typography variant={isDownSm ? "h5" : "h4"}>{ collection?.name }</Typography>
                                    </Breadcrumbs>
                                </Stack>
                            </Stack>
                            <Stack
                                direction={"row"}
                                spacing={4}
                                overflow={"scroll"}
                                pb={1}
                                divider={<Divider orientation={"vertical"} flexItem/>}
                            >
                                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                    <AvatarImage publicId={ collection?.user?.image?.value } size={isDownSm ? 30 : 40}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>User</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"}>
                                            { collection?.user.firstName }
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                    <AttachFileIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>Items</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"}>
                                            { collection?.itemsCount }
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                    <EventIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>Created at</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"} whiteSpace={"nowrap"}>
                                            { new Date(collection?.createdAt).toLocaleString() }
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                            <Typography variant={"body2"}>
                                { collection?.description }
                            </Typography>
                        </Stack>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    )
}

export default CollectionSingleCard