import {
    AppBar,
    Box,
    Toolbar,
    Button,
    useMediaQuery,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import SearchInput from "../../../inputs/SearchInput";
import {useLocation} from "react-router";
import AuthButton from "./AuthButton";
import {useTranslation} from "react-i18next";
import "../../../../utils/i18next";
import TaskDescriptionButton from './TaskDescriptionButton';

const MyAppBar = ({ onMenuClick }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))
    const location = useLocation()
    const { t } = useTranslation()

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
                        { isDownSm ? t("courseProject.short") : t("courseProject.long") }
                    </Button>
                    {
                        !location.pathname.startsWith("/admin") &&
                        <SearchInput/>
                    }
                    <Box sx={{ flexGrow: 1 }} />
                    <TaskDescriptionButton/>
                    <AuthButton/>
                </Toolbar>
            </AppBar>
    );
}

export default MyAppBar