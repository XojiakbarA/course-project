import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector, GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid"
import AddIcon from '@mui/icons-material/Add';
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {authSelector} from "../../store/selectors";

const MyGridToolbar = ({ onClick, buttonText, isOwnCollection }) => {

    const { isAdmin } = useSelector(authSelector)

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            {
                isOwnCollection || isAdmin
                ?
                <Button
                    size={"small"}
                    startIcon={<AddIcon/>}
                    onClick={onClick}
                >
                    { buttonText }
                </Button>
                :
                null
            }
        </GridToolbarContainer>
    )
}

export default MyGridToolbar