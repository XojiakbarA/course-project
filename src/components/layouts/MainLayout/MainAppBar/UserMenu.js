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
import {toggleAuth, toggleEditProfile} from "../../../../store/slices/dialogsSlice";
import CommonDialog from "../../../dialogs/CommonDialog";
import {authSelector, dialogsSelector} from "../../../../store/selectors";
import UserEditForm from "../../../forms/UserEditForm";
import UserImageEditForm from "../../../forms/UserImageEditForm";
import {isAdmin} from "../../../../utils/helpers";

const UserMenu = ({ anchorEl, onClose }) => {

    const dispatch = useDispatch()
    const { user, isAuth } = useSelector(authSelector)
    const { profile } = useSelector(dialogsSelector)
    const { mode, handleModeChange } = useTheme()

    const [anchorThemeEl, setAnchorThemeEl] = useState(null)
    const [anchorLanguageEl, setAnchorLanguageEl] = useState(null)

    const handleLoginClick = () => {
        onClose()
        dispatch(toggleAuth())
    }
    const handleEditClick = () => {
        onClose()
        dispatch(toggleEditProfile())
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
        <CommonDialog
            title={"Edit Profile"}
            maxWidth={"xs"}
            open={profile.edit}
            onClose={ e => dispatch(toggleEditProfile()) }
        >
            <UserImageEditForm/>
            <UserEditForm/>
        </CommonDialog>
        </>
    )
}

export default UserMenu