import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const ConfirmDialog = ({ open, onClose, content }) => {

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth={"xs"}>
            <DialogTitle>Collections</DialogTitle>
            <DialogContent dividers>
                <DialogContentText>{ content }</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog