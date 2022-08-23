import {CircularProgress, Grid, Pagination, useMediaQuery} from "@mui/material";
import PageTitle from "../components/commons/PageTitle";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ItemListCard from "../components/cards/ItemListCard";
import {useDispatch, useSelector} from "react-redux";
import {itemsSelector} from "../store/selectors";
import {useEffect} from "react";
import {getTagItems} from "../store/asyncThunk/itemsAsyncThunk";
import {useParams} from "react-router";
import {useSearchParams} from "react-router-dom";

const TagsID = () => {

    const dispatch = useDispatch()

    const { id } = useParams()

    const [params, setParams] = useSearchParams()

    const { content: items, getLoading, totalPages } = useSelector(itemsSelector)

    console.log(totalPages)

    const page = Number(params.get("page")) || 1

    useEffect(() => {
        dispatch(getTagItems({ id, params: { sortBy: "createdAt", sortType: "DESC", size: 12, page: page - 1 } }))
    }, [dispatch, id, page])

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

export default TagsID