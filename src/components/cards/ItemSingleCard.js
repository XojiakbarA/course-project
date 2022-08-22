import {
    Avatar,
    Box,
    Breadcrumbs,
    Card,
    CardContent, Chip,
    Divider, Grid,
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
import CardImage from "../images/CardImage";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleDeleteItem, toggleEditItem} from "../../store/slices/dialogsSlice";
import {editItemLikes} from "../../store/asyncThunk/itemsAsyncThunk";
import {authSelector} from "../../store/selectors";

const ItemSingleCard = ({ onLikeClick, item }) => {

    const dispatch = useDispatch()

    const toggleEditItemDialog = () => {
        dispatch(toggleEditItem())
    }
    const toggleDeleteItemDialog = () => {
        dispatch(toggleDeleteItem())
    }

    const { user } = useSelector(authSelector)

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const ref = useRef(null)

    const [cardWidth, setCardWidth] = useState(null)

    useEffect(() => {
        setCardWidth(ref.current.offsetWidth)
    }, [])

    const handleLikeClick = () => {
        dispatch(editItemLikes({ itemId: item?.id, userId: user?.id }))
    }

    return (
        <Card>
            <Grid container>
                <Grid item xs={12} md={5} lg={4} ref={ref}>
                    <CardImage publicId={item?.image?.value} width={cardWidth} height={250}/>
                </Grid>
                <Grid item xs={12} md={7} lg={8}>
                    <CardContent>
                        <Stack direction={"row"} spacing={1} justifyContent={"end"} alignItems={"center"}>
                            <Rating readOnly value={item?.rating}/>
                            <Tooltip title={"Like"}>
                                <IconButton onClick={handleLikeClick}>
                                    { item?.liked ? <ThumbUpIcon/> : <ThumbUpOffAltIcon/> }
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Edit"}>
                                <IconButton onClick={toggleEditItemDialog}>
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Delete"}>
                                <IconButton onClick={toggleDeleteItemDialog}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <Stack spacing={1}>
                            <Stack direction={"row"} spacing={1} alignItems={"end"}>
                                <Breadcrumbs>
                                    <Typography variant={isDownSm ? "body1" : "h6"} color={"text.disabled"}>
                                        { item?.collection?.topic?.name }
                                    </Typography>
                                    <Typography variant={isDownSm ? "body1" : "h6"} color={"text.disabled"}>
                                        { item?.collection?.name }
                                    </Typography>
                                    <Typography variant={isDownSm ? "h5" : "h4"}>
                                        { item?.name }
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
                                            { item?.collection?.user?.firstName }
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                    <ThumbUpIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>Likes</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"}>
                                            { item?.likesCount }
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                    <CommentIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>Comments</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"}>
                                            { item?.commentsCount }
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                    <EventIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>Created at</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"}>
                                            { new Date(item?.createdAt).toLocaleString() }
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
                                            item?.tags?.map(tag => (
                                                <Chip key={tag.id} size={"small"} label={tag.name}/>
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

export default ItemSingleCard