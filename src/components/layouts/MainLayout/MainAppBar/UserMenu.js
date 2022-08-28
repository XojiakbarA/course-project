import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CategoryIcon from '@mui/icons-material/Category';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LanguageIcon from '@mui/icons-material/Language';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from "react-router-dom";
import {useTheme} from "../../../../hooks/useTheme";
import {useState} from "react";
import LanguageMenu from "./LanguageMenu";
import ThemeMenu from "./ThemeMenu";
import {logout} from "../../../../store/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {toggleAuth, toggleEditUser, toggleLoginUser} from "../../../../store/slices/dialogsSlice";
import {authSelector} from "../../../../store/selectors";
import {isAdmin} from "../../../../utils/helpers";
import {setUser} from "../../../../store/slices/usersSlice";

const UserMenu = ({ anchorEl, onClose }) => {

    const dispatch = useDispatch()
    const { user, isAuth } = useSelector(authSelector)
    const { mode, handleModeChange } = useTheme()

    const [anchorThemeEl, setAnchorThemeEl] = useState(null)
    const [anchorLanguageEl, setAnchorLanguageEl] = useState(null)

    const handleLoginClick = () => {
        onClose()
        dispatch(toggleLoginUser())
    }
    const handleEditClick = () => {
        onClose()
        dispatch(setUser(user))
        dispatch(toggleEditUser())
    }
    const handleLogoutClick = () => {
        onClose()
        dispatch(logout())
    }

    return (
        <>
        <Menu
            dense={"true"}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            keepMounted
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            {
                !isAuth
                &&
                <MenuItem
                    onClick={handleLoginClick}
                >
                    <ListItemIcon><LoginIcon/></ListItemIcon>
                    <ListItemText>Login</ListItemText>
                </MenuItem>
            }
            {
                isAdmin(user)
                &&
                <MenuItem
                    component={Link}
                    to={"/admin"}
                    onClick={onClose}
                >
                    <ListItemIcon><AdminPanelSettingsIcon/></ListItemIcon>
                    <ListItemText>Admin Panel</ListItemText>
                </MenuItem>
            }
            {
                isAuth
                &&
                <MenuItem onClick={handleEditClick}>
                    <ListItemIcon><ManageAccountsIcon/></ListItemIcon>
                    <ListItemText>Edit Profile</ListItemText>
                </MenuItem>
            }
            {
                isAuth
                &&
                <MenuItem
                    component={Link}
                    to={"/my-collections"}
                    onClick={onClose}
                >
                    <ListItemIcon><CategoryIcon/></ListItemIcon>
                    <ListItemText>My Collections</ListItemText>
                </MenuItem>
            }
            {
                isAuth
                &&
                <MenuItem onClick={handleLogoutClick}>
                    <ListItemIcon><LogoutIcon/></ListItemIcon>
                    <ListItemText>Log Out</ListItemText>
                </MenuItem>
            }
            <MenuItem onClick={e => setAnchorThemeEl(e.currentTarget)}>
                <ListItemIcon>
                    { mode === 'light' ? <LightModeIcon/> : mode === 'dark' ? <DarkModeIcon/> : <BrightnessAutoIcon/> }
                </ListItemIcon>
                <ListItemText>Theme</ListItemText>
            </MenuItem>
            <MenuItem onClick={e => setAnchorLanguageEl(e.currentTarget)}>
                <ListItemIcon><LanguageIcon/></ListItemIcon>
                <ListItemText>Language</ListItemText>
            </MenuItem>
        </Menu>
        <LanguageMenu
            id={"lang-menu"}
            anchorEl={anchorLanguageEl}
            onClose={ e => setAnchorLanguageEl(null) }
        />
        <ThemeMenu
            id={"theme-menu"}
            anchorEl={anchorThemeEl}
            onClose={ e => setAnchorThemeEl(null) }
            onChange={handleModeChange}
            mode={mode}
        />
        </>
    )
}

export default UserMenu