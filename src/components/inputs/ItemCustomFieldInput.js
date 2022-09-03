import {Checkbox, FormControl, FormControlLabel, FormHelperText, Stack, TextField, useMediaQuery} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import enLocale from "date-fns/locale/en-GB"

const ItemCustomFieldInput = ({ customValues, collectionValue, touched, errors, getFieldProps, setFieldValue }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const handleDateChange = (v, i) => {
        setFieldValue(`customValues[${i}].value`, v.getTime())
    }
    const setLabel = (id) => {
        const field = collectionValue?.customFields?.find(f => f.id === id)
        return field?.name
    }
    const getType = (id) => {
        const field = collectionValue?.customFields?.find(f => f.id === id)
        return field?.type?.name
    }
    const renderInput = (type, value, i) => {
        switch (type) {
            case "integer":
                return (
                    <TextField
                        key={i}
                        fullWidth
                        type={"number"}
                        size={isDownSm ? "small" : "medium"}
                        variant={"filled"}
                        label={setLabel(value.customFieldId)}
                        error={ touched?.customValues?.length && touched.customValues[i]?.value && errors?.customValues?.length && Boolean(errors.name) }
                        helperText={ touched?.customValues?.length && touched.customValues[i]?.value && errors?.customValues?.length && errors.customValues[i].value }
                        { ...getFieldProps(`customValues[${i}].value`) }
                    />
                )
            case "text":
                return (
                    <TextField
                        key={i}
                        fullWidth
                        multiline
                        rows={5}
                        size={isDownSm ? "small" : "medium"}
                        variant={"filled"}
                        label={setLabel(value.customFieldId)}
                        error={ touched?.customValues?.length && touched.customValues[i]?.value && errors?.customValues?.length && Boolean(errors.name) }
                        helperText={ touched?.customValues?.length && touched.customValues[i]?.value && errors?.customValues?.length && errors.customValues[i].value }
                        { ...getFieldProps(`customValues[${i}].value`) }
                    />
                )
            case "bool":
                return (
                    <FormControl key={i}>
                        <FormControlLabel
                            control={<Checkbox/>}
                            label={setLabel(value.customFieldId)}
                            { ...getFieldProps(`customValues[${i}].value`) }
                        />
                        <FormHelperText error={touched?.customValues?.length && touched.customValues[i]?.value && errors?.customValues?.length && Boolean(errors.name)}>
                            {touched?.customValues?.length && touched.customValues[i]?.value && errors?.customValues?.length && errors.customValues[i].value}
                        </FormHelperText>
                    </FormControl>
                )
            case "date":
                return (
                    <LocalizationProvider key={i} dateAdapter={AdapterDateFns} adapterLocale={enLocale}>
                        <DateTimePicker
                            label={setLabel(value.customFieldId)}
                            value={Number(value.value)}
                            onChange={ v => handleDateChange(v, i) }
                            renderInput={(params) => (
                                <TextField
                                    variant={"filled"}
                                    InputLabelProps={{ shrink: true }}
                                    {...params}
                                    error={ touched?.customValues?.length && touched.customValues[i]?.value && errors?.customValues?.length && Boolean(errors.name) }
                                    helperText={ touched?.customValues?.length && touched.customValues[i]?.value && errors?.customValues?.length && errors.customValues[i].value }
                                />
                            )}
                        />
                    </LocalizationProvider>
                )
            default:
                return (
                    <TextField
                        key={i}
                        fullWidth
                        size={isDownSm ? "small" : "medium"}
                        variant={"filled"}
                        label={setLabel(value.customFieldId)}
                        error={ touched?.customValues?.length && touched.customValues[i]?.value && errors?.customValues?.length && Boolean(errors.name) }
                        helperText={ touched?.customValues?.length && touched.customValues[i]?.value && errors?.customValues?.length && errors.customValues[i].value }
                        { ...getFieldProps(`customValues[${i}].value`) }
                    />
                )
        }
    }

    return (
        <Stack spacing={2}>
            { customValues.map((value, i) => renderInput(getType(value.customFieldId), value, i)) }
        </Stack>
    )
}

export default ItemCustomFieldInput