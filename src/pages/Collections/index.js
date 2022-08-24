import {Grid, useMediaQuery} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import PageTitle from "../../components/commons/PageTitle";
import CollectionListCard from "../../components/cards/CollectionListCard";
import {useDispatch, useSelector} from "react-redux";
import {collectionsSelector} from "../../store/selectors";
import {useEffect, useState} from "react";
import {getCollections} from "../../store/asyncThunk/collectionsAsyncThunk";
import {setCollections} from "../../store/slices/collectionsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import CollectionListSkeleton from "../../components/skeletons/CollectionListSkeleton";

const Collections = () => {

    const dispatch = useDispatch()

    const { content: collections, getLoading } = useSelector(collectionsSelector)

    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const size = 12
    const skeletonSize = Array.from({length: size}, (_, i) => i)

    useEffect(() => {
        const params = { sortBy: "createdAt", sortType: "DESC", size, page }
        dispatch(getCollections({ params, setHasMore }))
    }, [dispatch, page])
    useEffect(() => {
        return () => {
            dispatch(setCollections([]))
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
                    text={"All Collections"}
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<CategoryIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid item xs={12}>
                <InfiniteScroll
                    style={{ overflow: "visible" }}
                    dataLength={collections.length}
                    next={handleNext}
                    hasMore={hasMore}
                >
                    <Grid container spacing={2}>
                        {
                            collections.map(collection => (
                                <Grid key={collection.id} item xs={12} sm={6} md={4} lg={3}>
                                    <CollectionListCard collection={collection}/>
                                </Grid>
                            ))
                        }
                        {
                            getLoading
                            &&
                            skeletonSize.map(skeleton => (
                                <Grid key={skeleton} item xs={12} md={6} lg={3}>
                                    <CollectionListSkeleton/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </InfiniteScroll>
            </Grid>
        </Grid>
    )
}

export default Collections