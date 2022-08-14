import {IconButton, CircularProgress, Badge, FormHelperText, Stack} from '@mui/material'
import {useState} from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import UploadMenu from '../menu/UploadMenu'
import AvatarImage from "../images/AvatarImage";

const AvatarUpload = ({
    handlePrewiewDeleteClick, handleUploadChange, handleDeleteImage,
    isLoading, name, src, preview, size, error, helperText, ...others
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
        <Stack spacing={1} alignItems={"center"} {...others}>
            <Badge
                overlap='circular'
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                badgeContent={
                    preview &&
                    <IconButton size='small' color='error' onClick={handlePrewiewDeleteClick}>
                        <RemoveCircleIcon fontSize='small'/>
                    </IconButton>
                }
            >
                <IconButton
                    onClick={handleClick}
                    size="large"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    disabled={isLoading}
                >
                    <AvatarImage publicId={preview || src} size={size} error={error} />
                    {
                        isLoading &&
                        <CircularProgress sx={{position: 'absolute'}}/>
                    }
                </IconButton>
            </Badge>
            <FormHelperText error={error}>{helperText}</FormHelperText>
            <UploadMenu
                open={open}
                anchorEl={anchorEl}
                name={name}
                disabled={!src}
                handleClose={handleClose}
                handleDeleteImage={handleDeleteImage}
                handleUploadChange={handleUploadChange}
            />
        </Stack>
    );
}

export default AvatarUpload