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

const CollectionListCard = ({ onEditClick, onDeleteClick }) => {

    return (
        <Card sx={{ position: "relative"}}>
            <CardActionArea
                component={Link}
                to={`/collections/${1}`}
                sx={{ pb: 5 }}
            >
                <CardMedia
                    component="img"
                    height="194"
                    image="/static/images/cards/paella.jpg"
                    alt="Paella dish"
                />
                <CardContent>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                        <Stack>
                            <Typography variant={"h5"} color={"primary.main"}>Collection 1</Typography>
                            <Typography gutterBottom color={"grey.400"}>Xojiakbar</Typography>
                        </Stack>
                        <Typography color={"secondary.dark"}>10 Items</Typography>
                    </Stack>
                    <Typography variant={"body2"} color={"text.disabled"}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cum deserunt dignissimos fugit hic impedit possimus repellat repellendus sint, voluptates! Harum minima perspiciatis quod temporibus veniam. Aspernatur iusto rem tempore!
                    </Typography>
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
            </CardActions>
        </Card>
    )
}

export default CollectionListCard