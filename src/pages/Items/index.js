import {Grid, Pagination, useMediaQuery} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PageTitle from "../../components/commons/PageTitle";
import ItemListCard from "../../components/cards/ItemListCard";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const Items = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    text={"Items"}
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<AttachFileIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {
                        items.map(item => (
                            <Grid key={item} item xs={12} sm={6} md={4} lg={3}>
                                <ItemListCard key={item}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            <Grid item xs={12} display={"flex"} justifyContent={isDownSm ? "center" : "end"}>
                <Pagination
                    color={"primary"}
                    count={10}
                />
            </Grid>
        </Grid>
    )
}

export default Items