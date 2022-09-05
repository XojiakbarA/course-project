import {Grid, useMediaQuery} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import PageTitle from "../../components/commons/PageTitle";
import CollectionListCard from "../../components/cards/CollectionListCard";
import {useDispatch, useSelector} from "react-redux";
import {collectionsSelector} from "../../store/selectors";
import {useEffect, useMemo, useState} from "react";
import {getCollections} from "../../store/asyncThunk/collectionsAsyncThunk";
import {setCollections} from "../../store/slices/collectionsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import CollectionListSkeleton from "../../components/skeletons/CollectionListSkeleton";
import {useTranslation} from "react-i18next";

const Collections = () => {

    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { content: collections, hasMore, getLoading } = useSelector(collectionsSelector)

    const [page, setPage] = useState(0)
    const params = useMemo(() => ({ sortBy: "createdAt", sortType: "DESC", size: 30, page }), [page])

    const skeletonSize = Array.from({length: 12}, (_, i) => i)

    useEffect(() => {
        dispatch(getCollections({ params }))
    }, [dispatch, params])
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
                    text={ t("allCollections") }
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