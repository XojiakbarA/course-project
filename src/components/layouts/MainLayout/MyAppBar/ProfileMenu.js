import {Menu, MenuItem} from "@mui/material";

const ProfileMenu = ({ id, anchorEl, onClose }) => {

    return (
        <Menu
            id={id}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            keepMounted
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <MenuItem onClick={onClose}>Profile</MenuItem>
            <MenuItem onClick={onClose}>Logout</MenuItem>
        </Menu>
    )
}

export default ProfileMenu