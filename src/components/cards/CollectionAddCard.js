import {Card, CardActionArea, Stack, Typography} from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import {useTranslation} from "react-i18next";

const CollectionAddCard = ({ onClick }) => {

    const { t } = useTranslation()

    return (
        <Card sx={{ height: "100%", minHeight: 347 }}>
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
                    <Typography variant={"body2"} color={"primary"}>{ t("createCollection") }</Typography>
                </Stack>
            </CardActionArea>
        </Card>
    )
}

export default CollectionAddCard