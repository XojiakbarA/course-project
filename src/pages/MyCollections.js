import {Grid, useMediaQuery} from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import PageTitle from "../components/commons/PageTitle";
import CollectionListCard from "../components/cards/CollectionListCard";
import {toggleCreateCollection, toggleDeleteCollection, toggleEditCollection} from "../store/slices/dialogsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getUserCollections} from "../store/asyncThunk/collectionsAsyncThunk";
import {authSelector, collectionsSelector} from "../store/selectors";
import CollectionAddCard from "../components/cards/CollectionAddCard";
import {setCollection, setCollections} from "../store/slices/collectionsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import CollectionListSkeleton from "../components/skeletons/CollectionListSkeleton";

const MyCollections = () => {

    const dispatch = useDispatch()

    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const size = page === 0 ? 11 : 12
    const skeletonSize = Array.from({length: size}, (_, i) => i)

    const { content: collections, getLoading } = useSelector(collectionsSelector)

    const { user } = useSelector(authSelector)

    const toggleCreateCollectionDialog = () => {
        dispatch(toggleCreateCollection())
    }
    const toggleEditCollectionDialog = (collection) => {
        dispatch(setCollection(collection))
        dispatch(toggleEditCollection())
    }
    const toggleDeleteCollectionDialog = (collection) => {
        dispatch(setCollection(collection))
        dispatch(toggleDeleteCollection())
    }
    const handleNext = () => {
        setPage(prev => prev + 1)
    }

    useEffect(() => {
        const params = { sortBy: "createdAt", sortType: "DESC", size, page }
        if (user?.id) {
            dispatch(getUserCollections({ id: user?.id, params, setHasMore }))
        }
    }, [dispatch, user?.id, page])
    useEffect(() => {
        return () => {
            dispatch(setCollections([]))
            dispatch(setCollection(null))
        }
    }, [dispatch])

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    text={"My Collections"}
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
                        <Grid item xs={12} md={6} lg={3}>
                            <CollectionAddCard onClick={toggleCreateCollectionDialog}/>
                        </Grid>
                        {
                            collections.map(collection => (
                                <Grid key={collection.id} item xs={12} md={6} lg={3}>
                                    <CollectionListCard
                                        onEditClick={toggleEditCollectionDialog}
                                        onDeleteClick={toggleDeleteCollectionDialog}
                                        collection={collection}
                                    />
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

export default MyCollections