import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useTranslation} from "react-i18next";

const ConfirmDialog = ({ open, onClose, onConfirmClick, content, loading }) => {

    const { t } = useTranslation()

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth={"xs"}>
            <DialogTitle>{ t("delete") }</DialogTitle>
            <DialogContent dividers>
                <DialogContentText>{ content }</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>{ t("cancel") }</Button>
                <LoadingButton onClick={onConfirmClick} loading={loading}>{ t("confirm") }</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog