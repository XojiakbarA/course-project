import {useFormik} from "formik";
import {collectionValidationSchema} from "../utils/validate";
import {useState} from "react";
import {useSelector} from "react-redux";
import {authSelector} from "../store/selectors";

export const useCollectionFormik = (onSubmit, collection) => {

    const { user } = useSelector(authSelector)

    const [userValue, setUserValue] = useState(collection?.user ?? user ?? null)
    const [topicValue, setTopicValue] = useState(collection?.topic ?? null)

    const setCustomFields = (collection) => {
        if (collection?.customFields?.length) {
            return collection.customFields.map(field => ({ name: field.name, customFieldTypeId: field.type.id }))
        }
        return []
    }

    const formik = useFormik({
        initialValues: {
            name: collection?.name ?? "",
            description: collection?.description ?? "",
            userId: user?.id ?? "",
            topicId: collection?.topic?.id ?? "",
            image: null,
            customFields: setCustomFields(collection)
        },
        enableReinitialize: true,
        validationSchema: collectionValidationSchema,
        onSubmit
    })

    const handleTopicChange = (e, value) => {
        setTopicValue(value)
        formik.setValues(prev => ({ ...prev, topicId: value?.id }))
    }
    const handleUserChange = (e, value) => {
        setUserValue(value)
        formik.setValues(prev => ({ ...prev, userId: value?.id }))
    }

    return { formik, userValue, topicValue, handleUserChange, handleTopicChange }
}