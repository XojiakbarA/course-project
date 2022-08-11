import {Image, Transformation} from "cloudinary-react";
import {Avatar} from "@mui/material";

const AvatarImage = ({ publicId, size }) => {

    return (
        publicId
        ?
        <Image publicId={publicId + ".png"}>
            <Transformation width={size} height={size} crop={"thumb"}  radius={"max"}/>
        </Image>
        :
        <Avatar sx={{ width: size, height: size }}/>
    )
}

export default AvatarImage