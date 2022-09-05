import {Popover, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useTranslation} from "react-i18next";

const LanguageMenu = ({ id, anchorEl, value, onChange, onClose }) => {

    const { t } = useTranslation()

    const handleChange = (e) => {
        onChange(e)
        onClose()
    }

    return (
        <Popover
            id={id}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <ToggleButtonGroup
                size={"small"}
                orientation={"vertical"}
                value={value}
                exclusive
                onChange={handleChange}
                aria-label="change mode"
                color='primary'
            >
                <ToggleButton value="en" aria-label="left aligned">
                    { t("english") }
                </ToggleButton>
                <ToggleButton value="uz" aria-label="right aligned">
                    { t("uzbek") }
                </ToggleButton>
            </ToggleButtonGroup>
        </Popover>
    )
}

export default LanguageMenu