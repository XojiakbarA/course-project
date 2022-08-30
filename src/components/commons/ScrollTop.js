import {Box, Fab, Fade, useScrollTrigger} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollTop = ({ window: window1 }) => {

    const trigger = useScrollTrigger({
        target: window1 ? window1() : undefined,
        disableHysteresis: true,
        threshold: 100,
    })

    const handleClick = (e) => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                <Fab size="small" aria-label="scroll back to top"><KeyboardArrowUpIcon/></Fab>
            </Box>
        </Fade>
    )
}

export default ScrollTop