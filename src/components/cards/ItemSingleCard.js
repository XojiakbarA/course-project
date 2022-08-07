import {
    Avatar,
    Box,
    Breadcrumbs,
    Card,
    CardContent, Chip,
    Divider,
    IconButton, Rating,
    Stack,
    Tooltip,
    Typography, useMediaQuery
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TagIcon from '@mui/icons-material/Tag';
import EventIcon from "@mui/icons-material/Event";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

const ItemSingleCard = ({ onEditClick, onDeleteClick, onLikeClick }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Card sx={{ minHeight: "100%" }}>
            <CardContent>
                <Stack direction={"row"} spacing={1} justifyContent={"end"} alignItems={"center"}>
                    <Rating readOnly value={3}/>
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
                    <Tooltip title={"Like"}>
                        <IconButton onClick={onLikeClick}>
                            <ThumbUpOffAltIcon/>
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Stack spacing={2}>
                    <Stack direction={"row"} spacing={1} alignItems={"end"}>
                        <Breadcrumbs>
                            <Typography variant={isDownSm ? "body1" : "h6"} color={"text.disabled"}>Topic 1</Typography>
                            <Typography variant={isDownSm ? "body1" : "h6"} color={"text.disabled"}>Collection 1</Typography>
                            <Typography variant={isDownSm ? "h5" : "h4"}>Item 1</Typography>
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
                                <Typography variant={isDownSm ? "body2" : "body1"}>Xojiakbar</Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={2} direction={"row"} alignItems={"center"}>
                            <ThumbUpIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                            <Box>
                                <Typography variant={"caption"} color={"primary"}>Likes</Typography>
                                <Typography variant={isDownSm ? "body2" : "body1"}>10</Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={2} direction={"row"} alignItems={"center"}>
                            <CommentIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                            <Box>
                                <Typography variant={"caption"} color={"primary"}>Comments</Typography>
                                <Typography variant={isDownSm ? "body2" : "body1"}>22</Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={2} direction={"row"} alignItems={"center"}>
                            <EventIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                            <Box>
                                <Typography variant={"caption"} color={"primary"}>Created at</Typography>
                                <Typography variant={isDownSm ? "body2" : "body1"}>07.08.2022 14:00</Typography>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack spacing={2} direction={"row"} alignItems={"center"}>
                        <TagIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                        <Box>
                            <Typography variant={"caption"} color={"primary"}>Tags</Typography>
                            <Stack direction={"row"} spacing={1}>
                                <Chip size={"small"} label={"#smartphones"}/>
                                <Chip size={"small"} label={"#gadgets"}/>
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default ItemSingleCard