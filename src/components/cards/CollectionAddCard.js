import {Card, CardActionArea, Stack, Typography} from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

const CollectionAddCard = ({ onClick }) => {

    return (
        <Card sx={{ height: "100%", minHeight: 300 }}>
            <CardActionArea
                sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onClick={onClick}
            >
                <Stack spacing={3} alignItems={"center"}>
                    <AddToPhotosIcon sx={{ transform: "scale(2)" }} color={"primary"}/>
                    <Typography variant={"body2"} color={"primary"}>Create Collection</Typography>
                </Stack>
            </CardActionArea>
        </Card>
    )
}

export default CollectionAddCard