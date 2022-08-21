import {Image, Transformation} from "cloudinary-react";
import {Avatar} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';

const AvatarImage = ({ publicId, size, error, itemImage }) => {

    return (
        publicId && !publicId.includes("http")
        ?
        <Image publicId={publicId + ".png"}>
            <Transformation width={size} height={size} crop={"fill"}  radius={"max"}/>
        </Image>
        :
        <Avatar src={publicId} sx={{ width: size, height: size, outline: error ? "1px solid red" : "0px" }}>
            { itemImage && <ImageIcon fontSize={"small"}/> }
        </Avatar>
    )
}

export default AvatarImage