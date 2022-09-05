import {CircularProgress, IconButton, Tooltip} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AvatarImage from "../../../images/AvatarImage";
import {useSelector} from "react-redux";
import {authSelector} from "../../../../store/selectors";
import {useState} from "react";
import UserMenu from "./UserMenu";
import {useTranslation} from "react-i18next";

const AuthButton = () => {

    const { t } = useTranslation()

    const { getLoading, user, isAuth } = useSelector(authSelector)

    const [anchorEl, setAnchorEl] = useState(null)

    const handleAuthClick = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
        <Tooltip title={isAuth ? t("menu") : t("login")}>
            <IconButton color={"inherit"} onClick={handleAuthClick}>
                {
                    getLoading
                    ?
                    <CircularProgress size={20} color={"inherit"}/> :
                    (
                        isAuth
                        ?
                        <AvatarImage publicId={user?.image?.value} size={40}/>
                        :
                        <AccountCircleIcon fontSize={"large"}/>
                    )
                }
            </IconButton>
        </Tooltip>
        <UserMenu anchorEl={anchorEl} onClose={handleMenuClose}/>
        </>
    )

}

export default AuthButton