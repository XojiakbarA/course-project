import {Grid} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteTopic, getTopics} from "../../store/asyncThunk/topicsAsyncThunk";
import {dialogsSelector, topicsSelector} from "../../store/selectors";
import TopicCard from "../../components/cards/TopicCard";
import TopicSkeleton from "../../components/skeletons/TopicSkeleton";
import {setTopic, setTopics} from "../../store/slices/topicsSlice";
import TopicAddCard from "../../components/cards/TopicAddCard";
import InfiniteScroll from "react-infinite-scroll-component";
import {toggleCreateTopic, toggleDeleteTopic} from "../../store/slices/dialogsSlice";
import ConfirmDialog from "../../components/dialogs/ConfirmDialog";

const Topics = () => {

    const dispatch = useDispatch()
    const { topic: topicDialog } = useSelector(dialogsSelector)
    const { content: topics, single: topic, hasMore, getLoading, deleteLoading } = useSelector(topicsSelector)

    console.log(deleteLoading)

    const [page, setPage] = useState(0)
    const size = 20
    const params = useMemo(() => ({ sortBy: "createdAt", sortType: "DESC", size, page }), [size, page])

    const skeletonSize = Array.from({length: size}, (_, i) => i)

    useEffect(() => {
        dispatch(getTopics({ params }))
    }, [dispatch, params])
    useEffect(() => {
        return () => {
            dispatch(setTopics([]))
            dispatch(setTopic(null))
        }
    }, [dispatch])

    const toggleDeleteTopicDialog = () => {
        dispatch(toggleDeleteTopic())
    }
    const toggleCreateTopicDialog = () => {
        dispatch(toggleCreateTopic())
    }
    const handleTopicDeleteClick = () => {
        dispatch(deleteTopic({ id: topic?.id, params }))
    }
    const handleNext = () => {
        setPage(prev => prev + 1)
    }

    return (
        <Grid container spacing={2}>
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
            <ConfirmDialog
                open={topicDialog.delete}
                onClose={toggleDeleteTopicDialog}
                onConfirmClick={handleTopicDeleteClick}
                loading={deleteLoading}
                content={"Do you really want to delete the topic?"}
            />
        </Grid>
    )
}

export default Topics