import {useFormik} from "formik";
import {useState} from "react";
import {userValidationSchema} from "../utils/validate";

export const useUserFormik = (onSubmit, user) => {

    const [rolesValue, setRolesValue] = useState(user?.roles ?? [])

    const formik = useFormik({
        initialValues: {
            isNonLocked: user?.isNonLocked ?? true,
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            roleIds: user?.roles?.map(r => r.id) ?? [],
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