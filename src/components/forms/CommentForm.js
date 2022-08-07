import {Button, FormControl, FormHelperText, InputLabel, Rating, Stack, TextField, useMediaQuery} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {StarBorder} from "@mui/icons-material";

const CommentForm = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <form>
        <Stack spacing={2} alignItems={"end"}>
            <FormControl variant={"standard"}>
                <InputLabel shrink htmlFor={"rating"}>Rating</InputLabel>
                <Rating
                    sx={{ pt: 2 }}
                    name='rating'
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={Number(values.rating)}
                    emptyIcon={
                        <StarBorder
                            fontSize="inherit"
                            // color={touched.rating && errors.rating ? 'error' : 'inherit'}
                        />
                    }
                />
                {/*<FormHelperText error={true}>{touched.rating && errors.rating}</FormHelperText>*/}
            </FormControl>
            <TextField
                fullWidth
                variant={"filled"}
                label={"Comment"}
                multiline
                rows={5}
            />
            <Button
                variant={"contained"}
                size={isDownSm ? "small" : "medium"}
                startIcon={<SendIcon/>}
            >
                Send
            </Button>
        </Stack>
        </form>
    )
}

export default CommentForm