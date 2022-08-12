import {Image, Transformation} from "cloudinary-react";
import {Avatar} from "@mui/material";

const AvatarImage = ({ publicId, size }) => {

    return (
        publicId && !publicId.startsWith("https://")
        ?
        <Image publicId={publicId + ".png"}>
            <Transformation width={size} height={size} crop={"thumb"}  radius={"max"}/>
        </Image>
        :
        <Avatar src={publicId} sx={{ width: size, height: size }}/>
    )
}

export default AvatarImage