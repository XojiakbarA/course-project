import { Autocomplete, CircularProgress, TextField } from "@mui/material"

const AutocompleteInput = ({
    name, label, error, helperText,
    options, option, getOptionLabel, loading,
    handleChange, handleBlur, disabled, size, variant
}) => {
    
    return (
        <Autocomplete
            size={size}
            disabled={disabled}
            options={options}
            loading={loading}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={getOptionLabel}
            renderInput={params => (
                <TextField
                    {...params}
                    label={label}
                    error={error}
                    helperText={helperText}
                    name={name}
                    variant={variant}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <>
                                {loading ? <CircularProgress size={20}/> : null}
                                {params.InputProps.startAdornment}
                            </>
                        )
                    }}
                />
            )}
            onBlur={handleBlur}
            value={option}
            onChange={handleChange}
        />
    )
}

export default AutocompleteInput