import {Image, Transformation} from "cloudinary-react";
import {Avatar} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

const CardImage = ({ publicId, width, height, preview }) => {

    return (
        preview
        ?
        <Avatar src={preview} variant={"rounded"} sx={{ width: "100%", height: height }}/>
        :
        publicId && width
        ?
        <Avatar variant={"rounded"} sx={{ width: "100%", height: "100%" }}>
            <Image publicId={publicId + ".png"}>
                <Transformation width={width} height={height} crop={"fill"}/>
            </Image>
        </Avatar>
        :
        <Avatar variant={"rounded"} sx={{ width: "100%", height: height }}>
            <ImageIcon sx={{ transform: "scale(2)" }}/>
        </Avatar>
    )
}

export default CardImage