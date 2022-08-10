import {Grid, Pagination, useMediaQuery} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import PageTitle from "../../components/commons/PageTitle";
import CollectionListCard from "../../components/cards/CollectionListCard";

const collections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const Collections = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    text={"Collections"}
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<CategoryIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {
                        collections.map(collection => (
                            <Grid key={collection} item xs={12} sm={6} md={4} lg={3}>
                                <CollectionListCard key={collection}/>
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

export default Collections