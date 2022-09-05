import {Stack, TextField, useMediaQuery} from "@mui/material";
import {useFormik} from "formik";
import {topicValidationSchema} from "../../utils/validate";
import {LoadingButton} from "@mui/lab";
import {useTranslation} from "react-i18next";

const TopicForm = ({ buttonIcon, buttonLoading, buttonText, onSubmit, topic }) => {

    const { t } = useTranslation()

    const { handleSubmit, getFieldProps, touched, errors } = useFormik({
        initialValues: {
            name: topic?.name ?? "",
        },
        enableReinitialize: true,
        validationSchema: topicValidationSchema,
        onSubmit
    })

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2} alignItems={"center"}>
                <TextField
                    fullWidth
                    size={isDownSm ? "small" : "medium"}
                    variant={"filled"}
                    label={ t("name") }
                    error={ touched.name && Boolean(errors.name) }
                    helperText={ touched.name && errors.name }
                    { ...getFieldProps("name") }
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

export default TopicForm