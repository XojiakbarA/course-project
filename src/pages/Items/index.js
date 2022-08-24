import {Grid, useMediaQuery} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PageTitle from "../../components/commons/PageTitle";
import ItemListCard from "../../components/cards/ItemListCard";
import {useDispatch, useSelector} from "react-redux";
import {itemsSelector} from "../../store/selectors";
import {useEffect, useState} from "react";
import {getItems} from "../../store/asyncThunk/itemsAsyncThunk";
import {setItems} from "../../store/slices/itemsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemListSkeleton from "../../components/skeletons/ItemListSkeleton";

const Items = () => {

    const dispatch = useDispatch()

    const { content: items, getLoading } = useSelector(itemsSelector)

    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const size = 12
    const skeletonSize = Array.from({length: size}, (_, i) => i)

    useEffect(() => {
        const params = { sortBy: "createdAt", sortType: "DESC", size, page }
        dispatch(getItems({ params, setHasMore }))
    }, [dispatch, page])
    useEffect(() => {
        return () => {
            dispatch(setItems([]))
        }
    }, [dispatch])

    const handleNext = () => {
        setPage(prev => prev + 1)
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
                <InfiniteScroll
                    style={{ overflow: "visible" }}
                    dataLength={items.length}
                    next={handleNext}
                    hasMore={hasMore}
                >
                    <Grid container spacing={2}>
                        {
                            items.map(item => (
                                <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                                    <ItemListCard item={item}/>
                                </Grid>
                            ))
                        }
                        {
                            getLoading
                            &&
                            skeletonSize.map(skeleton => (
                                <Grid key={skeleton} item xs={12} md={6} lg={3}>
                                    <ItemListSkeleton/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </InfiniteScroll>
            </Grid>
        </Grid>
    )
}

export default Items