import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, Chip,
    IconButton, Rating,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

const ItemListCard = ({ onLikeClick }) => {

    return (
        <Card sx={{ position: "relative"}}>
            <CardActionArea
                component={Link}
                to={"/items/1"}
                sx={{ pb: 5 }}
            >
                <CardMedia
                    component="img"
                    height="194"
                    image="/static/images/cards/paella.jpg"
                    alt="Paella dish"
                />
                <CardContent>
                    <Stack spacing={2}>
                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                            <Stack>
                                <Typography variant={"h5"} color={"primary.main"}>Item 1</Typography>
                                <Typography color={"grey.400"}>Collection 1</Typography>
                            </Stack>
                            <Stack spacing={1} alignItems={"end"}>
                                <Rating readOnly value={4} size={"small"}/>
                                <Stack direction={"row"} spacing={2}>
                                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                                        <ThumbUpIcon fontSize={"small"} color={"disabled"}/>
                                        <Typography variant={"body2"}>10</Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                                        <CommentIcon fontSize={"small"} color={"disabled"}/>
                                        <Typography variant={"body2"}>10</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction={"row"} spacing={1}>
                            <Chip size={"small"} label={"#smartphones"}/>
                            <Chip size={"small"} label={"#gadgets"}/>
                        </Stack>
                    </Stack>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                display: "flex",
                justifyContent: "flex-end"
            }}>
                <Tooltip title={"Like"}>
                    <IconButton onClick={onLikeClick}>
                        <ThumbUpOffAltIcon/>
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    )
}

export default ItemListCard