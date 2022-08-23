import {CircularProgress, Grid, Pagination, useMediaQuery} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import PageTitle from "../../components/commons/PageTitle";
import CollectionListCard from "../../components/cards/CollectionListCard";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {collectionsSelector} from "../../store/selectors";
import {useEffect} from "react";
import {getCollections} from "../../store/asyncThunk/collectionsAsyncThunk";

const Collections = () => {

    const dispatch = useDispatch()

    const [params, setParams] = useSearchParams()

    const { content: collections, getLoading, totalPages } = useSelector(collectionsSelector)

    const page = Number(params.get("page")) || 1

    useEffect(() => {
        dispatch(getCollections({ params: { sortBy: "createdAt", sortType: "DESC", size: 12, page: page - 1 } }))
    }, [dispatch, page])

    const handlePageChange = (e, page) => {
        setParams({ page })
    }

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    text={"All Collections"}
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<CategoryIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {
                        getLoading
                        ?
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <CircularProgress/>
                        </Grid>
                        :
                        collections.map(collection => (
                            <Grid key={collection.id} item xs={12} sm={6} md={4} lg={3}>
                                <CollectionListCard collection={collection}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            <Grid item xs={12} display={"flex"} justifyContent={isDownSm ? "center" : "end"}>
                {
                    !getLoading && totalPages > 1 &&
                    <Pagination
                        color={"primary"}
                        page={page}
                        count={totalPages}
                        onChange={handlePageChange}
                    />
                }
            </Grid>
        </Grid>
    )
}

export default Collections