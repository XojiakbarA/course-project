import {
    Box,
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
import CardImage from "../images/CardImage";
import {useEffect, useRef, useState} from "react";

const ItemListCard = ({ onLikeClick, item }) => {

    const ref = useRef(null)

    const [cardWidth, setCardWidth] = useState(null)

    useEffect(() => {
        setCardWidth(ref.current.offsetWidth)
    }, [])

    return (
        <Card sx={{ position: "relative", height: "100%" }} ref={ref}>
            <CardActionArea
                component={Link}
                to={`/items/${item?.id}`}
                sx={{ pb: 5, height: "100%" }}
            >
                <CardMedia component="div" height="194">
                    {
                        <CardImage
                            publicId={item?.image?.value}
                            width={cardWidth}
                            height={194}
                        />
                    }
                </CardMedia>
                <CardContent>
                    <Stack spacing={2}>
                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                            <Stack>
                                <Typography variant={"h5"} color={"primary.main"}>{ item?.name }</Typography>
                                <Typography color={"grey.400"}>{ item?.collection?.name }</Typography>
                            </Stack>
                            <Stack spacing={1} alignItems={"end"}>
                                <Rating readOnly value={4} size={"small"}/>
                                <Stack direction={"row"} spacing={2}>
                                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                                        <ThumbUpIcon fontSize={"small"} color={"disabled"}/>
                                        <Typography variant={"body2"}>{ item?.likesCount }</Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                                        <CommentIcon fontSize={"small"} color={"disabled"}/>
                                        <Typography variant={"body2"}>{ item?.commentsCount }</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Box>
                            {
                                item?.tags?.map(tag => (
                                    <Chip key={tag.id} size={"small"} label={tag.name} sx={{ mb: 1, mr: 1 }}/>
                                ))
                            }
                        </Box>
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