import {Popover, ToggleButton, ToggleButtonGroup} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";

const ThemeMenu = ({ id, anchorEl, onClose, onChange, mode }) => {

    return (
        <Popover
            id={id}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
            transformOrigin={{ vertical: "center", horizontal: "right" }}
        >
            <ToggleButtonGroup
                size={"small"}
                value={mode}
                exclusive
                onChange={onChange}
                aria-label="change mode"
                color='primary'
            >
                <ToggleButton value="light" aria-label="left aligned">
                    <LightModeIcon/>
                </ToggleButton>
                <ToggleButton value="dark" aria-label="centered">
                    <DarkModeIcon/>
                </ToggleButton>
                <ToggleButton value="" aria-label="right aligned">
                    <BrightnessAutoIcon/>
                </ToggleButton>
            </ToggleButtonGroup>
        </Popover>
    )
}

export default ThemeMenu