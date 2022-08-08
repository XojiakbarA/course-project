import {AppBar, Box, Toolbar, Button, useMediaQuery, Stack, Typography, IconButton} from '@mui/material';
import AccountCircle from "@mui/icons-material/AccountCircle";
import LanguageIcon from '@mui/icons-material/Language';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {Link} from "react-router-dom";
import SearchInput from "../../../inputs/SearchInput";
import IconButtonMenu from "./IconButtonMenu";
import MobileMenu from "./MobileMenu";
import {useMemo, useState} from "react";
import ProfileMenu from "./ProfileMenu";
import LanguageMenu from "./LanguageMenu";
import ThemeMenu from "./ThemeMenu";
import {useTheme} from "../../../../hooks/useTheme";
import CommonDialog from "../../../dialogs/CommonDialog";
import LoginForm from "../../../forms/LoginForm";
import RegisterForm from "../../../forms/RegisterForm";
import {useLocation, useNavigate} from "react-router";

const MyAppBar = ({ onMenuClick }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const location = useLocation()
    const navigate = useNavigate()

    const [authDialog, setAuthDialog] = useState(false)
    const [isLogin, setIsLogin] = useState(true)

    const toggleAuthDialog = () => setAuthDialog(prev => !prev)

    const [anchorProfileEl, setAnchorProfileEl] = useState(null)
    const [anchorLanguageEl, setAnchorLanguageEl] = useState(null)
    const [anchorThemeEl, setAnchorThemeEl] = useState(null)

    const { mode, handleModeChange } = useTheme()

    const menu = useMemo(() => {
        return [
            {
                id: 1,
                title: "Profile",
                icon: <AccountCircle fontSize={"large"}/>,
                size: "large",
                onClick: e => navigate("/profile")
            },
            {
                id: 2,
                title: "Admin Panel",
                icon: <AdminPanelSettingsIcon fontSize={"large"}/>,
                size: "large",
                onClick: e => navigate("/admin")
            },
            {
                id: 3,
                title: "Language",
                icon: <LanguageIcon/>,
                size: "medium",
                onClick: e => setAnchorLanguageEl(e.currentTarget)
            },
            {
                id: 4,
                title: "Theme",
                icon: mode === 'light' ? <LightModeIcon/> : mode === 'dark' ? <DarkModeIcon/> : <BrightnessAutoIcon/>,
                size: "medium",
                onClick: e => setAnchorThemeEl(e.currentTarget)
            }
        ]
    }, [mode])

    return (
            <AppBar position="fixed">
                <Toolbar>
                    {
                        location.pathname.startsWith("/admin") &&
                        <IconButton
                            color={"inherit"}
                            onClick={onMenuClick}
                        >
                            <MenuIcon/>
                        </IconButton>
                    }
                    <Button
                        color={"inherit"}
                        size={"large"}
                        component={Link}
                        to={"/"}
                        sx={{ mr: 1 }}
                    >
                        { isDownSm ? "CP" : "CourseProject" }
                    </Button>
                    {
                        !location.pathname.startsWith("/admin") &&
                        <SearchInput/>
                    }
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButtonMenu menu={menu}/>
                    <MobileMenu menu={menu}/>
                    <ProfileMenu
                        id={"profile-menu"}
                        anchorEl={anchorProfileEl}
                        onClose={ e => setAnchorProfileEl(null) }
                    />
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
                </Toolbar>
                <CommonDialog
                    title={isLogin ? "Login" : "Register"}
                    maxWidth={"xs"}
                    open={authDialog}
                    onClose={ toggleAuthDialog }
                >
                    <Stack spacing={2}>
                        { isLogin ? <LoginForm/> : <RegisterForm/> }
                        <Stack direction={"row"} spacing={2} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography>
                                { isLogin ? "Don't have an account yet?" : "Already have an account?" }
                            </Typography>
                            <Button onClick={ e => setIsLogin(prev => !prev) }>
                                { isLogin ? "Register" : "Login" }
                            </Button>
                        </Stack>
                    </Stack>
                </CommonDialog>
            </AppBar>
    );
}

export default MyAppBar