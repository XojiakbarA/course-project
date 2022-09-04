import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import CardImage from "../images/CardImage";
import {useLocation} from "react-router";

const CollectionListCard = ({ onEditClick, onDeleteClick, collection, sx }) => {

    const location = useLocation()

    const ref = useRef(null)

    const [cardWidth, setCardWidth] = useState(null)

    useEffect(() => {
        setCardWidth(ref.current.offsetWidth)
    }, [])

    return (
        <Card ref={ref} sx={sx ?? { position: "relative", height: "100%" }}>
            <CardActionArea
                component={Link}
                to={`/collections/${collection?.id}`}
                sx={{ pb: 5, height: "100%" }}
            >
                <CardMedia component="div" height="194">
                {
                    <CardImage
                        publicId={collection?.image?.value}
                        width={cardWidth}
                        height={194}
                    />
                }
                </CardMedia>
                <CardContent>
                    <Typography variant={"h5"} color={"primary.dark"}>{collection?.name}</Typography>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography gutterBottom color={"grey.400"}>{collection?.user?.firstName}</Typography>
                        <Typography color={"secondary.dark"}>{ collection?.itemsCount } Items</Typography>
                    </Stack>
                    <Typography variant={"body2"} color={"text.disabled"}>{collection?.description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ position: "absolute", bottom: 0, left: 0, width: "100%", display: "flex", justifyContent: "flex-end"}}>
                {
                    location.pathname === "/my-collections"
                    &&
                    <>
                    <Tooltip title={"Edit"}>
                        <IconButton onClick={ e => onEditClick(collection) }>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Delete"}>
                        <IconButton onClick={ e => onDeleteClick(collection) }>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                    </>
                }
            </CardActions>
        </Card>
    )
}

export default CollectionListCard