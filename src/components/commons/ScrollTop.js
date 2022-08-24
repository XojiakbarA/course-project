import {Box, Fade, useScrollTrigger} from "@mui/material";

const ScrollTop = ({ children, window: window1 }) => {

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
                {children}
            </Box>
        </Fade>
    )
}

export default ScrollTop