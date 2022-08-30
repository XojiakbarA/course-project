import CommonDialog from "./CommonDialog";
import {Button, Stack, Typography} from "@mui/material";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import UserForm from "../forms/UserForm";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "./ConfirmDialog";
import {useDispatch, useSelector} from "react-redux";
import {dialogsSelector, usersSelector} from "../../store/selectors";
import {
    toggleCreateUser,
    toggleDeleteUserImage,
    toggleEditUser,
    toggleLoginUser
} from "../../store/slices/dialogsSlice";
import {appendToFormData} from "../../utils/helpers";
import {deleteUserImage, editUser} from "../../store/asyncThunk/usersAsyncThunk";

const UserDialogsWrapper = () => {

    const dispatch = useDispatch()

    const { user: userDialog } = useSelector(dialogsSelector)

    const { single: user, editLoading, deleteImageLoading } = useSelector(usersSelector)

    const toggleLoginUserDialog = () => {
        dispatch(toggleLoginUser())
    }
    const toggleAuthDialog = () => {
        dispatch(toggleLoginUser())
        dispatch(toggleCreateUser())
    }

    const toggleCreateUserDialog = () => {
        dispatch(toggleCreateUser())
    }

    const toggleEditUserDialog = () => {
        dispatch(toggleEditUser())
    }
    const handleUserEditSubmit = (data) => {
        const formData = appendToFormData(data)
        dispatch(editUser({ id: user?.id, data: formData }))
    }

    const toggleDeleteUserImageDialog = () => {
        dispatch(toggleDeleteUserImage())
    }
    const handleUserDeleteImageClick = () => {
        dispatch(deleteUserImage({ id: user?.id }))
    }

    return (
        <>
            <CommonDialog
                title={"Login"}
                maxWidth={"xs"}
                open={userDialog.login}
                onClose={toggleLoginUserDialog}
            >
                <Stack spacing={2}>
                    <LoginForm/>
                    <Stack direction={"row"} spacing={2} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography>Don't have an account yet?</Typography>
                        <Button onClick={toggleAuthDialog}>Register</Button>
                    </Stack>
                </Stack>
            </CommonDialog>
            <CommonDialog
                title={"Create User"}
                maxWidth={"xs"}
                open={userDialog.create}
                onClose={toggleCreateUserDialog}
            >
                <RegisterForm/>
                <Stack direction={"row"} spacing={2} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography>Already have an account?</Typography>
                    <Button onClick={toggleAuthDialog}>Login</Button>
                </Stack>
            </CommonDialog>
            <CommonDialog
                title={"Edit User"}
                maxWidth={"xs"}
                open={userDialog.edit}
                onClose={toggleEditUserDialog}
            >
                <UserForm
                    buttonText={"Edit"}
                    buttonIcon={<EditIcon/>}
                    buttonLoading={editLoading}
                    onSubmit={handleUserEditSubmit}
                    user={user}
                />
            </CommonDialog>
            <ConfirmDialog
                open={userDialog.deleteImage}
                onClose={toggleDeleteUserImageDialog}
                onConfirmClick={handleUserDeleteImageClick}
                loading={deleteImageLoading}
                content={"Do you really want to delete the image?"}
            />
        </>
    )
}

export default UserDialogsWrapper