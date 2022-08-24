import {
    AppBar,
    Box,
    Toolbar,
    Button,
    useMediaQuery,
    Stack,
    Typography,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import SearchInput from "../../../inputs/SearchInput";
import CommonDialog from "../../../dialogs/CommonDialog";
import LoginForm from "../../../forms/LoginForm";
import RegisterForm from "../../../forms/RegisterForm";
import {useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {dialogsSelector} from "../../../../store/selectors";
import {toggleAuth, toggleAuthForm} from "../../../../store/slices/dialogsSlice";
import AuthButton from "./AuthButton";

const MyAppBar = ({ onMenuClick }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const dispatch = useDispatch()
    const location = useLocation()
    const { auth } = useSelector(dialogsSelector)

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
                <CommonDialog
                    title={auth.isLogin ? "Login" : "Register"}
                    maxWidth={"xs"}
                    open={auth.isOpen}
                    onClose={ e => dispatch(toggleAuth()) }
                >
                    <Stack spacing={2}>
                        { auth.isLogin ? <LoginForm/> : <RegisterForm/> }
                        <Stack direction={"row"} spacing={2} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography>
                                { auth.isLogin ? "Don't have an account yet?" : "Already have an account?" }
                            </Typography>
                            <Button onClick={ e => dispatch(toggleAuthForm()) }>
                                { auth.isLogin ? "Register" : "Login" }
                            </Button>
                        </Stack>
                    </Stack>
                </CommonDialog>
            </AppBar>
    );
}

export default MyAppBar