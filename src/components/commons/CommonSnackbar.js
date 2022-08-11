import {Alert, Snackbar} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {setSnackbar} from "../../store/slices/snackbarSlice";

const CommonSnackbar = () => {

    const dispatch = useDispatch()

    const { data, open, color } = useSelector(state => state.snackbar)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setSnackbar({ open: false }))
    }

    return (
        <Snackbar
            sx={{ minWidth: 200 }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                sx={{ width: '100%' }}
                severity={color}
                color={color}
                onClose={handleClose}
            >
                { data }
            </Alert>
        </Snackbar>
    )
}

export default CommonSnackbar