import {Grid, useMediaQuery} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PageTitle from "../../components/commons/PageTitle";
import ItemListCard from "../../components/cards/ItemListCard";
import {useDispatch, useSelector} from "react-redux";
import {itemsSelector} from "../../store/selectors";
import {useEffect, useMemo, useState} from "react";
import {getItems} from "../../store/asyncThunk/itemsAsyncThunk";
import {setItems} from "../../store/slices/itemsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemListSkeleton from "../../components/skeletons/ItemListSkeleton";
import ItemDialogsWrapper from "../../components/dialogs/ItemDialogsWrapper";

const Items = () => {

    const dispatch = useDispatch()

    const { content: items, hasMore, getLoading } = useSelector(itemsSelector)

    const [page, setPage] = useState(0)
    const params = useMemo(() => ({ sortBy: "createdAt", sortType: "DESC", size: 30, page }), [page])

    const skeletonSize = Array.from({length: 12}, (_, i) => i)

    useEffect(() => {
        dispatch(getItems({ params }))
    }, [dispatch, params])
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
            <ItemDialogsWrapper params={params}/>
        </Grid>
    )
}

export default Items