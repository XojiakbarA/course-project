import {Image, Transformation} from "cloudinary-react";
import {Avatar} from "@mui/material";

const AvatarImage = ({ publicId, size, error }) => {

    return (
        publicId && !publicId.includes("http")
        ?
        <Image publicId={publicId + ".png"}>
            <Transformation width={size} height={size} crop={"fill"}  radius={"max"}/>
        </Image>
        :
        <Avatar src={publicId} sx={{ width: size, height: size, outline: error ? "1px solid red" : "0px" }}/>
    )
}

export default AvatarImage