import {Box, Avatar, IconButton, CircularProgress, Badge} from '@mui/material'
import {useState} from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import UploadMenu from '../menu/UploadMenu'

const AvatarUpload = ({
    handlePrewiewDeleteClick, handleUploadChange, handleDeleteImage,
    isLoading, name, src, preview, size, ...others
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
                    <Avatar
                        sx={{ width: size, height: size }}
                        src={preview || src}
                    />
                    {
                        isLoading &&
                        <CircularProgress sx={{position: 'absolute'}}/>
                    }
                </IconButton>
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
    );
}

export default AvatarUpload