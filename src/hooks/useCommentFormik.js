import {useFormik} from "formik";
import {commentValidationSchema} from "../utils/validate";
import {useState} from "react";
import {useSelector} from "react-redux";
import {authSelector, itemsSelector} from "../store/selectors";

export const useCommentFormik = (onSubmit, comment) => {

    const { single: item } = useSelector(itemsSelector)

    const { user } = useSelector(authSelector)

    const [userValue, setUserValue] = useState(comment?.user ?? user)
    const [itemValue, setItemValue] = useState(comment?.item ?? item ?? null)

    const formik = useFormik({
        initialValues: {
            userId: comment?.user?.id ?? user?.id ?? "",
            itemId: comment?.item?.id ?? item?.id ?? "",
            rating: comment?.rating ?? 0,
            text: comment?.text ?? ""
        },
        enableReinitialize: true,
        validationSchema: commentValidationSchema,
        onSubmit
    })

    const handleUserChange = (e, value) => {
        setUserValue(value)
        formik.setValues(prev => ({ ...prev, userId: value?.id }))
    }
    const handleItemChange = (e, value) => {
        setItemValue(value)
        formik.setValues(prev => ({ ...prev, itemId: value?.id }))
    }

    return { ...formik, userValue, itemValue, handleUserChange, handleItemChange }
}