import {Grid, useMediaQuery} from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';
import PageTitle from "../../components/commons/PageTitle";
import TagAddCard from "../../components/cards/TagAddCard";
import TagCard from "../../components/cards/TagCard";
import TagSkeleton from "../../components/skeletons/TagSkeleton";
import {useDispatch, useSelector} from "react-redux";
import {tagsSelector} from "../../store/selectors";
import {useEffect, useMemo, useState} from "react";
import {getTags} from "../../store/asyncThunk/tagsAsyncThunk";
import TagDialogsWrapper from "../../components/dialogs/TagDialogsWrapper";
import {setTag, setTags} from "../../store/slices/tagsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import {toggleCreateTag} from "../../store/slices/dialogsSlice";

const Tags = () => {

    const dispatch = useDispatch()
    const { content: tags, hasMore, getLoading } = useSelector(tagsSelector)

    const [page, setPage] = useState(0)
    const params = useMemo(() => ({ sortBy: "createdAt", sortType: "DESC", size: 30, page }), [page])

    const skeletonSize = Array.from({length: 12}, (_, i) => i)

    useEffect(() => {
        dispatch(getTags({ params }))
    }, [dispatch, params])
    useEffect(() => {
        dispatch(setTags([]))
        dispatch(setTag(null))
    }, [dispatch])

    const toggleCreateTagDialog = () => {
        dispatch(toggleCreateTag())
    }
    const handleNext = () => {
        setPage(prev => prev + 1)
    }

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    text={"Tags"}
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<TagIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid item xs={12}>
                <InfiniteScroll
                    style={{ overflow: "visible" }}
                    dataLength={tags.length}
                    next={handleNext}
                    hasMore={hasMore}
                >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TagAddCard onClick={toggleCreateTagDialog}/>
                    </Grid>
                    {
                        tags.map(tag => (
                            <Grid key={tag.id} item xs={12} sm={6} md={4} lg={3}>
                                <TagCard tag={tag}/>
                            </Grid>
                        ))
                    }
                    {
                        getLoading
                        &&
                        skeletonSize.map(item => (
                            <Grid key={item} item xs={12} sm={6} md={4} lg={3}>
                                <TagSkeleton/>
                            </Grid>
                        ))
                    }
                </Grid>
                </InfiniteScroll>
            </Grid>
            <TagDialogsWrapper params={params}/>
        </Grid>
    )
}

export default Tags