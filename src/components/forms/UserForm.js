import {FormControlLabel, Stack, Switch, TextField, useMediaQuery} from "@mui/material";
import AutocompleteInput from "../inputs/AutocompleteInput";
import {useDispatch, useSelector} from "react-redux";
import {authSelector, rolesSelector} from "../../store/selectors";
import {useUserFormik} from "../../hooks/useUserFormik";
import {useEffect} from "react";
import {getRoles} from "../../store/asyncThunk/rolesAsyncThunk";
import {LoadingButton} from "@mui/lab";
import AvatarUpload from "../commons/AvatarUpload";
import {useSinglePreview} from "../../hooks/useSinglePreview";
import {isAdmin} from "../../utils/helpers";
import {toggleDeleteUserImage} from "../../store/slices/dialogsSlice";

const UserForm = ({ buttonIcon, buttonLoading, buttonText, onSubmit, user }) => {

    const dispatch = useDispatch()

    const { content: roles, getLoading } = useSelector(rolesSelector)
    const { user: authUser } = useSelector(authSelector)

    useEffect(() => {
        dispatch(getRoles())
    }, [dispatch])

    const {
        handleSubmit, handleBlur, getFieldProps, touched, errors, values, setValues, setTouched,
        rolesValue, handleRolesChange, handleUnlockedChange,
    } = useUserFormik(onSubmit, user)

    const { preview, handleUploadChange, handlePreviewDeleteClick } = useSinglePreview(setValues, setTouched)

    const handleDeleteImageClick = () => {
        dispatch(toggleDeleteUserImage())
    }

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2} alignItems={"center"}>
                <AvatarUpload
                    handleUploadChange={handleUploadChange}
                    handleDeleteImage={handleDeleteImageClick}
                    handlePreviewDeleteClick={handlePreviewDeleteClick}
                    name='image'
                    src={user?.image?.value}
                    size={isDownSm ? 100 : 120}
                    isLoading={getLoading}
                    preview={preview}
                    error={ Boolean(errors.image) }
                    helperText={ errors.image }
                />
                {
                    isAdmin(authUser)
                    &&
                    <FormControlLabel
                        control={<Switch checked={values.isNonLocked}/>}
                        label="Unlocked"
                        name={"isNonLocked"}
                        onChange={handleUnlockedChange}
                        onBlur={handleBlur}
                    />
                }
                {
                    isAdmin(authUser)
                    &&
                    <AutocompleteInput
                        multiple
                        fullWidth
                        size={isDownSm ? "small" : "medium"}
                        variant={"filled"}
                        label={"Roles"}
                        options={roles}
                        value={rolesValue}
                        loading={getLoading}
                        disabled={getLoading}
                        name="roleIds"
                        onChange={handleRolesChange}
                        onBlur={handleBlur}
                        error={ touched.roleIds && Boolean(errors.roleIds) }
                        helperText={ touched.roleIds && errors.roleIds }
                        getOptionLabel={option => option.name}
                    />
                }
                <TextField
                    fullWidth
                    size={isDownSm ? "small" : "medium"}
                    variant={"filled"}
                    label={"First Name"}
                    error={ touched.firstName && Boolean(errors.firstName) }
                    helperText={ touched.firstName && errors.firstName }
                    { ...getFieldProps('firstName') }
                />
                <TextField
                    fullWidth
                    size={isDownSm ? "small" : "medium"}
                    variant={"filled"}
                    label={"Last Name"}
                    error={ touched.lastName && Boolean(errors.lastName) }
                    helperText={ touched.lastName && errors.lastName }
                    { ...getFieldProps('lastName') }
                />
                <LoadingButton
                    fullWidth
                    variant={"contained"}
                    size={isDownSm ? "small" : "medium"}
                    startIcon={buttonIcon}
                    type={"submit"}
                    loading={buttonLoading}
                >
                    { buttonText }
                </LoadingButton>
            </Stack>
        </form>
    )
}

export default UserForm