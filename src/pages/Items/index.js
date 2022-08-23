import {CircularProgress, Grid, Pagination, useMediaQuery} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PageTitle from "../../components/commons/PageTitle";
import ItemListCard from "../../components/cards/ItemListCard";
import {useDispatch, useSelector} from "react-redux";
import {itemsSelector} from "../../store/selectors";
import {useEffect} from "react";
import {getItems} from "../../store/asyncThunk/itemsAsyncThunk";
import {useSearchParams} from "react-router-dom";

const Items = () => {

    const dispatch = useDispatch()

    const [params, setParams] = useSearchParams()

    const { content: items, getLoading, totalPages } = useSelector(itemsSelector)

    const page = Number(params.get("page")) || 1

    useEffect(() => {
        dispatch(getItems({ params: { sortBy: "createdAt", sortType: "DESC", size: 12, page: page - 1 } }))
    }, [dispatch, page])

    const handlePageChange = (e, page) => {
        setParams({ page })
    }

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    text={"All Items"}
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<AttachFileIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
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
                        items.map(item => (
                            <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                                <ItemListCard item={item}/>
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

export default Items