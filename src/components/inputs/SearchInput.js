import SearchIcon from "@mui/icons-material/Search";
import {Search, SearchIconWrapper, StyledInputBase} from "../styled";
import {useTranslation} from "react-i18next";

const SearchInput = () => {

    const { t } = useTranslation()

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={t("search") + "..."}
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    )
}

export default SearchInput