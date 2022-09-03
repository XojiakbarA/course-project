import {useFormik} from "formik";
import {itemValidationSchema} from "../utils/validate";
import {useState} from "react";
import {useSelector} from "react-redux";
import {collectionsSelector} from "../store/selectors";

export const useItemFormik = (onSubmit, item) => {

    const { single: collection } = useSelector(collectionsSelector)

    const [collectionValue, setCollectionValue] = useState(item?.collection ?? collection)
    const [tagsValue, setTagsValue] = useState(item?.tags ?? [])

    const setCustomValues = () => {
        if (item?.customValues?.length) {
            return item.customValues.map(customValue => ({
                customFieldId: customValue.customField.id,
                value: customValue.value
            }))
        }
        if (collection?.customFields) {
            return collection.customFields.map(field => ({ customFieldId: field.id, value: "" }))
        }
        return []
    }

    const formik = useFormik({
        initialValues: {
            name: item?.name ?? "",
            collectionId: item?.collection?.id ?? collection?.id ?? "",
            tagIds: item?.tags?.map(i => i.id) ?? [],
            image: null,
            customValues: setCustomValues()
        },
        enableReinitialize: true,
        validationSchema: itemValidationSchema,
        onSubmit
    })

    const handleCollectionChange = (e, value) => {
        formik.setValues(prev => ({ ...prev, collectionId: value?.id }))
        let values = []
        if (value) {
            values = value.customFields.map(field => ({ customFieldId: field.id, value: "" }))
        }
        formik.setFieldValue("customValues", values)
        setCollectionValue(value)
    }
    const handleTagsChange = (e, value) => {
        const tagIds = value.map(i => i.id)
        formik.setValues(prev => ({ ...prev, tagIds }))
        setTagsValue(value)
    }

    return { ...formik, collectionValue, tagsValue, handleCollectionChange, handleTagsChange }
}