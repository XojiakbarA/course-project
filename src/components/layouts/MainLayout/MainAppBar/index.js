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

const MyAppBar = ({ onMenuClick }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const location = useLocation()

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
                    <AuthButton/>
                </Toolbar>
            </AppBar>
    );
}

export default MyAppBar