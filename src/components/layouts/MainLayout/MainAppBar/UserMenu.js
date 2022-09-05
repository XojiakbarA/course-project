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
import {toggleEditUser, toggleLoginUser} from "../../../../store/slices/dialogsSlice";
import {authSelector} from "../../../../store/selectors";
import {setUser} from "../../../../store/slices/usersSlice";
import {useTranslation} from "react-i18next";

const UserMenu = ({ anchorEl, onClose }) => {

    const dispatch = useDispatch()
    const { isAdmin, isAuth, user } = useSelector(authSelector)
    const { mode, handleModeChange } = useTheme()
    const { i18n, t } = useTranslation()

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
    const handleLangChange = (e) => {
        i18n.changeLanguage(e.target.value)
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
                    <ListItemText>{ t("login") }</ListItemText>
                </MenuItem>
            }
            {
                isAdmin
                &&
                <MenuItem
                    component={Link}
                    to={"/admin"}
                    onClick={onClose}
                >
                    <ListItemIcon><AdminPanelSettingsIcon/></ListItemIcon>
                    <ListItemText>{ t("adminPanel") }</ListItemText>
                </MenuItem>
            }
            {
                isAuth
                &&
                <MenuItem onClick={handleEditClick}>
                    <ListItemIcon><ManageAccountsIcon/></ListItemIcon>
                    <ListItemText>{ t("editProfile") }</ListItemText>
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
                    <ListItemText>{ t("myCollections") }</ListItemText>
                </MenuItem>
            }
            {
                isAuth
                &&
                <MenuItem onClick={handleLogoutClick}>
                    <ListItemIcon><LogoutIcon/></ListItemIcon>
                    <ListItemText>{ t("logOut") }</ListItemText>
                </MenuItem>
            }
            <MenuItem onClick={e => setAnchorThemeEl(e.currentTarget)}>
                <ListItemIcon>
                    { mode === 'light' ? <LightModeIcon/> : mode === 'dark' ? <DarkModeIcon/> : <BrightnessAutoIcon/> }
                </ListItemIcon>
                <ListItemText>{ t("theme") }</ListItemText>
            </MenuItem>
            <MenuItem onClick={e => setAnchorLanguageEl(e.currentTarget)}>
                <ListItemIcon><LanguageIcon/></ListItemIcon>
                <ListItemText>{ t("language") } ({i18n.language.toUpperCase()})</ListItemText>
            </MenuItem>
        </Menu>
        <LanguageMenu
            id={"lang-menu"}
            anchorEl={anchorLanguageEl}
            onClose={ e => setAnchorLanguageEl(null) }
            onChange={handleLangChange}
            value={i18n.language}
        />
        <ThemeMenu
            id={"theme-menu"}
            anchorEl={anchorThemeEl}
            onClose={ e => setAnchorThemeEl(null) }
            onChange={handleModeChange}
            value={mode}
        />
        </>
    )
}

export default UserMenu