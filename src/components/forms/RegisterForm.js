import {FormControlLabel, Stack, Switch, TextField, useMediaQuery} from "@mui/material";
import PasswordInput from "../inputs/PasswordInput";
import {LoadingButton} from "@mui/lab";
import AvatarUpload from "../commons/AvatarUpload";
import {useSinglePreview} from "../../hooks/useSinglePreview";
import {useFormik} from "formik";
import {registerValidationSchema} from "../../utils/validate";
import {appendToFormData, isAdmin} from "../../utils/helpers";
import {useDispatch, useSelector} from "react-redux";
import {authSelector, rolesSelector, usersSelector} from "../../store/selectors";
import {toggleDeleteUserImage} from "../../store/slices/dialogsSlice";
import {useEffect, useState} from "react";
import AutocompleteInput from "../inputs/AutocompleteInput";
import {getRoles} from "../../store/asyncThunk/rolesAsyncThunk";
import {createUser} from "../../store/asyncThunk/usersAsyncThunk";

const RegisterForm = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const dispatch = useDispatch()

    const { content: roles, getLoading } = useSelector(rolesSelector)
    const { user: authUser } = useSelector(authSelector)
    const { createLoading } = useSelector(usersSelector)

    const [rolesValue, setRolesValue] = useState([])

    const {
        handleSubmit, handleBlur, setValues, setTouched,
        touched, errors, getFieldProps, values
    } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            isNonLocked: "",
            roleIds: [],
            image: null
        },
        enableReinitialize: true,
        validationSchema: registerValidationSchema,
        onSubmit: (data) => {
            const formData = appendToFormData(data)
            dispatch(createUser({ data: formData }))
        }
    })

    useEffect(() => {
        dispatch(getRoles())
    }, [dispatch])

    const { preview, handleUploadChange, handlePreviewDeleteClick } = useSinglePreview(setValues, setTouched)

    const handleDeleteImageClick = () => {
        dispatch(toggleDeleteUserImage())
    }
    const handleRolesChange = (e, value) => {
        const roleIds = value.map(i => i.id)
        setValues(prev => ({ ...prev, roleIds }))
        setRolesValue(value)
    }
    const handleUnlockedChange = (e, isNonLocked) => {
        setValues(prev => ({ ...prev, isNonLocked }))
    }

    return (
        <form onSubmit={handleSubmit}>
        <Stack spacing={2} alignItems={"center"}>
            <AvatarUpload
                handleUploadChange={handleUploadChange}
                handleDeleteImage={handleDeleteImageClick}
                handlePreviewDeleteClick={handlePreviewDeleteClick}
                name='image'
                size={isDownSm ? 100 : 120}
                preview={preview}
                error={ Boolean(errors.image) }
                helperText={ errors.image }
            />
            {
                isAdmin(authUser)
                &&
                <FormControlLabel
                    control={<Switch checked={Boolean(values.isNonLocked)}/>}
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
            <TextField
                fullWidth
                size={isDownSm ? "small" : "medium"}
                variant={"filled"}
                label={"Email"}
                error={ touched.email && Boolean(errors.email) }
                helperText={ touched.email && errors.email }
                { ...getFieldProps('email') }
            />
            <PasswordInput
                fullWidth
                size={isDownSm ? "small" : "medium"}
                label={"Password"}
                error={ touched.password && Boolean(errors.password) }
                helperText={ touched.password && errors.password }
                { ...getFieldProps('password') }
            />
            <PasswordInput
                fullWidth
                size={isDownSm ? "small" : "medium"}
                label={"Confirm Password"}
                error={ touched.confirmPassword && Boolean(errors.confirmPassword) }
                helperText={ touched.confirmPassword && errors.confirmPassword }
                { ...getFieldProps('confirmPassword') }
            />
            <LoadingButton
                fullWidth
                variant={"contained"}
                size={isDownSm ? "small" : "medium"}
                type={"submit"}
                loading={createLoading}
            >
                Register
            </LoadingButton>
        </Stack>
        </form>
    )
}

export default RegisterForm