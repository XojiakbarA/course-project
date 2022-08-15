import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {LoadingButton} from "@mui/lab";

const ConfirmDialog = ({ open, onClose, onConfirmClick, content, loading }) => {

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth={"xs"}>
            <DialogTitle>Collections</DialogTitle>
            <DialogContent dividers>
                <DialogContentText>{ content }</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancel</Button>
                <LoadingButton onClick={onConfirmClick} loading={loading}>Confirm</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog