import {Dialog, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {TransitionFade, TransitionSlide} from "../transitions";

const CommonDialog = ({ maxWidth, open, onClose, title, children }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}
            fullScreen={isDownSm}
            TransitionComponent={isDownSm ? TransitionSlide : TransitionFade}
        >
            <DialogTitle display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant={"button"}>{ title }</Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                { children }
            </DialogContent>
        </Dialog>
    )
}

export default CommonDialog