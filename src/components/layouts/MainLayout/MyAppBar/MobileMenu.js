import {Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import {useState} from "react";

const MobileMenu = ({ menu }) => {

    const [anchorEl, setMobileMoreAnchorEl] = useState(null)

    const open = Boolean(anchorEl)

    const handleClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const id = 'primary-search-account-menu-mobile'

    return (
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
                size="large"
                aria-label="show more"
                aria-controls={id}
                aria-haspopup="true"
                onClick={handleOpen}
                color="inherit"
            >
                <MoreIcon/>
            </IconButton>
            <Menu
                id={id}
                open={open}
                anchorEl={anchorEl}
                keepMounted
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {
                    menu.map(item => (
                        <MenuItem key={item.id} onClick={item.onClick}>
                            <ListItemIcon sx={{ mr: 1 }}>{item.icon}</ListItemIcon>
                            <ListItemText>{ item.title }</ListItemText>
                        </MenuItem>
                    ))
                }
            </Menu>
        </Box>
    )
}

export default MobileMenu