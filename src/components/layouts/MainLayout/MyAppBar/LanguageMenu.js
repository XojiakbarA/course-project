import {Menu, MenuItem} from "@mui/material";

const LanguageMenu = ({ id, anchorEl, onClose }) => {

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
            <MenuItem onClick={onClose}>English</MenuItem>
            <MenuItem onClick={onClose}>Russian</MenuItem>
        </Menu>
    )
}

export default LanguageMenu