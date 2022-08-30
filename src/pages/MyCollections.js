import {Grid, useMediaQuery} from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import PageTitle from "../components/commons/PageTitle";
import CollectionListCard from "../components/cards/CollectionListCard";
import {toggleCreateCollection, toggleDeleteCollection, toggleEditCollection} from "../store/slices/dialogsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {getUserCollections} from "../store/asyncThunk/collectionsAsyncThunk";
import {authSelector, collectionsSelector} from "../store/selectors";
import CollectionAddCard from "../components/cards/CollectionAddCard";
import {setCollection, setCollections, setFetchCollectionsType} from "../store/slices/collectionsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import CollectionListSkeleton from "../components/skeletons/CollectionListSkeleton";
import {FETCH_USER_COLLECTIONS} from "../store/fetchTypes";
import CollectionDialogsWrapper from "../components/dialogs/CollectionDialogsWrapper";

const MyCollections = () => {

    const dispatch = useDispatch()

    const skeletonSize = Array.from({length: 12}, (_, i) => i)

    const { content: collections, hasMore, getLoading } = useSelector(collectionsSelector)
    const { user } = useSelector(authSelector)

    const [page, setPage] = useState(0)
    const params = useMemo(() => ({ sortBy: "createdAt", sortType: "DESC", size: 30, page }), [page])

    useEffect(() => {
        if (user?.id) {
            dispatch(getUserCollections({ id: user?.id, params }))
        }
    }, [dispatch, user?.id, params])
    useEffect(() => {
        return () => {
            dispatch(setCollections([]))
            dispatch(setCollection(null))
        }
    }, [dispatch])

    const toggleCreateCollectionDialog = () => {
        dispatch(toggleCreateCollection())
    }
    const toggleEditCollectionDialog = (collection) => {
        dispatch(setCollection(collection))
        dispatch(toggleEditCollection())
    }
    const toggleDeleteCollectionDialog = (collection) => {
        dispatch(setFetchCollectionsType(FETCH_USER_COLLECTIONS))
        dispatch(setCollection(collection))
        dispatch(toggleDeleteCollection())
    }
    const handleNext = () => {
        setPage(prev => prev + 1)
    }


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
            <CollectionDialogsWrapper params={params}/>
        </Grid>
    )
}

export default MyCollections