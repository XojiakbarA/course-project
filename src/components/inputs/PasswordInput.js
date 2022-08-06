import {useState} from "react"
import {FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel} from "@mui/material"
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'


const PasswordInput = ({ fullWidth, size, label, name, value, error, helperText, onChange, onBlur }) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <FormControl variant="filled" fullWidth={fullWidth}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <FilledInput
                type={showPassword ? 'text' : 'password'}
                size={size}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={error}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={ e => setShowPassword(prev => !prev) }
                            onMouseDown={ e => e.preventDefault() }
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText error>{helperText}</FormHelperText>
        </FormControl>
    )
}

export default PasswordInput