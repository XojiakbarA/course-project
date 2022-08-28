import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector, GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid"
import AddIcon from '@mui/icons-material/Add';
import {Button} from "@mui/material";

const MyGridToolbar = ({ onClick, buttonText }) => {

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            <Button
                size={"small"}
                startIcon={<AddIcon/>}
                onClick={onClick}
            >
                { buttonText }
            </Button>
        </GridToolbarContainer>
    )
}

export default MyGridToolbar