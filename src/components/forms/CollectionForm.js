import {Button, Grid, Stack, TextField, useMediaQuery} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import {LoadingButton} from "@mui/lab";
import ImageUpload from "../commons/ImageUpload";
import {useFormik} from "formik";
import {useSinglePreview} from "../../hooks/useSinglePreview";
import AutocompleteInput from "../inputs/AutocompleteInput";

const CollectionForm = ({ buttonText, buttonIcon, onCancelClick }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const { setValues } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            image: null
        }
    })

    const { preview, handleUploadChange, handlePreviewDeleteClick } = useSinglePreview(setValues)

    return (
        <form>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <ImageUpload
                        handlePrewiewDeleteClick={handlePreviewDeleteClick}
                        handleUploadChange={handleUploadChange}
                        handleDeleteImage={ e => setValues(prev => ({ ...prev, image: null })) }
                        name='image'
                        preview={preview}
                        width={"100%"}
                        height={200}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            size={isDownSm ? "small" : "medium"}
                            variant={"filled"}
                            label={"Title"}
                            value={"Collection 1"}
                        />
                        <AutocompleteInput
                            size={isDownSm ? "small" : "medium"}
                            variant={"filled"}
                            label={"Topic"}
                            options={[]}
                            disabled
                        />
                        <TextField
                            fullWidth
                            size={isDownSm ? "small" : "medium"}
                            variant={"filled"}
                            label={"Description"}
                            value={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cum deserunt dignissimos fugit hic impedit possimus repellat repellendus sint, voluptates! Harum minima perspiciatis quod temporibus veniam. Aspernatur iusto rem tempore!"}
                            multiline
                            rows={5}
                        />
                        <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
                            <Button
                                variant={"outlined"}
                                size={isDownSm ? "small" : "medium"}
                                startIcon={<CancelIcon/>}
                                onClick={onCancelClick}
                            >
                                Cancel
                            </Button>
                            <LoadingButton
                                variant={"contained"}
                                size={isDownSm ? "small" : "medium"}
                                startIcon={buttonIcon}
                            >
                                { buttonText }
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    )
}

export default CollectionForm