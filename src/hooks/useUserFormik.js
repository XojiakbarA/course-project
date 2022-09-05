import {useFormik} from "formik";
import {useState} from "react";
import {userValidationSchema} from "../utils/validate";
import {useSelector} from "react-redux";
import {authSelector} from "../store/selectors";

export const useUserFormik = (onSubmit, user) => {

    const { isAdmin } = useSelector(authSelector)

    const [rolesValue, setRolesValue] = useState(user?.roles ?? [])

    const formik = useFormik({
        initialValues: {
            isNonLocked: isAdmin ? user?.isNonLocked : null,
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            roleIds: isAdmin ? user?.roles?.map(r => r.id) : null,
            image: null
        },
        enableReinitialize: true,
        validationSchema: userValidationSchema,
        onSubmit
    })

    const handleRolesChange = (e, value) => {
        const roleIds = value.map(i => i.id)
        formik.setValues(prev => ({ ...prev, roleIds }))
        setRolesValue(value)
    }
    const handleUnlockedChange = (e, isNonLocked) => {
        formik.setValues(prev => ({ ...prev, isNonLocked }))
    }

    return {
        ...formik, rolesValue,
        handleRolesChange, handleUnlockedChange
    }
}