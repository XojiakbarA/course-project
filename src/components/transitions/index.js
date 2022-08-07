import {Fade, Slide} from "@mui/material";
import {forwardRef} from "react";

export const TransitionSlide = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})
export const TransitionFade = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})