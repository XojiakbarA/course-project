import {CircularProgress, Grid, useMediaQuery} from "@mui/material";
import PageTitle from "../components/commons/PageTitle";
import TagIcon from '@mui/icons-material/Tag';
import ItemListCard from "../components/cards/ItemListCard";
import {useDispatch, useSelector} from "react-redux";
import {itemsSelector, tagsSelector} from "../store/selectors";
import {useEffect, useMemo, useState} from "react";
import {getTagItems} from "../store/asyncThunk/itemsAsyncThunk";
import {useNavigate, useParams} from "react-router";
import {getTag} from "../store/asyncThunk/tagsAsyncThunk";
import {setTag} from "../store/slices/tagsSlice";
import {setItems} from "../store/slices/itemsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemListSkeleton from "../components/skeletons/ItemListSkeleton";

const TagsID = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const { single: tag, hasMore, getSingleLoading } = useSelector(tagsSelector)
    const { content: items, getLoading } = useSelector(itemsSelector)

    const [page, setPage] = useState(0)
    const params = useMemo(() => ({ sortBy: "createdAt", sortType: "DESC", size: 30, page }), [page])

    const skeletonSize = Array.from({length: 12}, (_, i) => i)

    useEffect(() => {
        dispatch(getTag({ id, navigate }))
        dispatch(getTagItems({ id, params }))
    }, [dispatch, id, params])
    useEffect(() => {
        return () => {
            dispatch(setTag(null))
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
                    text={ getSingleLoading ? <CircularProgress size={20}/> : tag?.name }
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<TagIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
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

export default TagsID