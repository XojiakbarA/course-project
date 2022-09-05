import {Grid, useMediaQuery} from "@mui/material";
import TopicIcon from '@mui/icons-material/Topic';
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTopics} from "../../store/asyncThunk/topicsAsyncThunk";
import {topicsSelector} from "../../store/selectors";
import TopicCard from "../../components/cards/TopicCard";
import TopicSkeleton from "../../components/skeletons/TopicSkeleton";
import {setTopic, setTopics} from "../../store/slices/topicsSlice";
import TopicAddCard from "../../components/cards/TopicAddCard";
import InfiniteScroll from "react-infinite-scroll-component";
import {toggleCreateTopic} from "../../store/slices/dialogsSlice";
import PageTitle from "../../components/commons/PageTitle";
import TopicDialogsWrapper from "../../components/dialogs/TopicDialogsWrapper";
import {useTranslation} from "react-i18next";

const Topics = () => {

    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { content: topics, hasMore, getLoading } = useSelector(topicsSelector)

    const [page, setPage] = useState(0)
    const params = useMemo(() => ({ sortBy: "createdAt", sortType: "DESC", size: 30, page }), [page])

    const skeletonSize = Array.from({length: 12}, (_, i) => i)

    useEffect(() => {
        dispatch(getTopics({ params }))
    }, [dispatch, params])
    useEffect(() => {
        return () => {
            dispatch(setTopics([]))
            dispatch(setTopic(null))
        }
    }, [dispatch])


    const toggleCreateTopicDialog = () => {
        dispatch(toggleCreateTopic())
    }
    const handleNext = () => {
        setPage(prev => prev + 1)
    }

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    text={ t("topics") }
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<TopicIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid item xs={12}>
                <InfiniteScroll
                    style={{ overflow: "visible" }}
                    dataLength={topics.length}
                    next={handleNext}
                    hasMore={hasMore}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TopicAddCard onClick={toggleCreateTopicDialog}/>
                        </Grid>
                        {
                            topics.map(topic => (
                                <Grid key={topic.id} item xs={12} sm={6} md={4} lg={3}>
                                    <TopicCard topic={topic}/>
                                </Grid>
                            ))
                        }
                        {
                            getLoading
                            &&
                            skeletonSize.map(item => (
                                <Grid key={item} item xs={12} sm={6} md={4} lg={3}>
                                    <TopicSkeleton/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </InfiniteScroll>
            </Grid>
            <TopicDialogsWrapper params={params}/>
        </Grid>
    )
}

export default Topics