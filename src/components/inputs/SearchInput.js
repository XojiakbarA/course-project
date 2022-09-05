import SearchIcon from "@mui/icons-material/Search";
import {Search, SearchIconWrapper, StyledInputBase} from "../styled";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useNavigate} from "react-router";

const SearchInput = () => {

    const navigate = useNavigate()
    const { t } = useTranslation()

    const [value, setValue] = useState("")

    const handleChange = (e) => {
        setValue(e.target.value)
    }
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            navigate(`/search/${value}`)
        }
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={t("search") + "..."}
                inputProps={{ 'aria-label': 'search' }}
                value={value}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
        </Search>
    )
}

export default SearchInput