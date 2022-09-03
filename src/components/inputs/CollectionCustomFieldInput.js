import {IconButton, Stack, TextField, useMediaQuery} from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {useState} from "react";
import AutocompleteInput from "./AutocompleteInput";

const CollectionCustomFieldInput = ({
    index, loading, customFieldTypes, touched, errors, typeInitValue,
    getFieldProps, handleBlur, setFieldValue, onRemoveClick
}) => {

    const [customFieldTypeValue, setCustomFieldTypeValue] = useState(typeInitValue ?? null)

    const handleTypeChange = (e, value) => {
        setCustomFieldTypeValue(value)
        setFieldValue(`customFields[${index}].customFieldTypeId`, value?.id)
    }

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <TextField
                fullWidth
                size={isDownSm ? "small" : "medium"}
                variant={"filled"}
                label={"Name"}
                error={ touched?.customFields?.length && touched.customFields[index]?.name && errors?.customFields?.length &&  Boolean(errors.customFields[index]?.name) }
                helperText={ touched?.customFields?.length && touched.customFields[index]?.name && errors?.customFields?.length &&  errors.customFields[index]?.name }
                { ...getFieldProps(`customFields[${index}].name`) }
            />
            <AutocompleteInput
                fullWidth
                size={isDownSm ? "small" : "medium"}
                variant={"filled"}
                label={"Type"}
                options={customFieldTypes}
                value={customFieldTypeValue}
                loading={loading}
                disabled={loading}
                name={`customFields[${index}].customFieldTypeId`}
                onChange={handleTypeChange}
                onBlur={handleBlur}
                error={ touched?.customFields?.length && touched.customFields[index]?.customFieldTypeId && errors?.customFields?.length &&  Boolean(errors.customFields[index]?.customFieldTypeId) }
                helperText={ touched?.customFields?.length && touched.customFields[index]?.customFieldTypeId && errors?.customFields?.length &&  errors.customFields[index]?.customFieldTypeId }
                getOptionLabel={option => option.name}
            />
            <IconButton color={"error"} onClick={onRemoveClick}>
                <RemoveCircleIcon/>
            </IconButton>
        </Stack>
    )
}

export default CollectionCustomFieldInput