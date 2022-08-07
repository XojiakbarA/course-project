import {Avatar, Badge, Box, Button, IconButton} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadMenu from "../menu/UploadMenu";
import {useState} from "react";

const ImageUpload = ({
     handlePrewiewDeleteClick, handleUploadChange, handleDeleteImage,
     isLoading, name, src, preview, width, height, ...others
 }) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box {...others}>
            <Badge
                sx={{ width }}
                overlap='rectangular'
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                badgeContent={
                    preview &&
                    <IconButton size='small' color='error' onClick={handlePrewiewDeleteClick}>
                        <RemoveCircleIcon fontSize='small'/>
                    </IconButton>
                }
            >
                <Button
                    color={"inherit"}
                    sx={{ width }}
                    onClick={handleClick}
                >
                    <Avatar
                        src={preview || src}
                        sx={{ width, height }}
                        variant={"rounded"}
                    >
                        <AddPhotoAlternateIcon sx={{ transform: "scale(2)" }}/>
                    </Avatar>
                </Button>
            </Badge>
            <UploadMenu
                open={open}
                anchorEl={anchorEl}
                name={name}
                disabled={!src}
                handleClose={handleClose}
                handleDeleteImage={handleDeleteImage}
                handleUploadChange={handleUploadChange}
            />
        </Box>
    )
}

export default ImageUpload