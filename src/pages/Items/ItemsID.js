import {Box, CircularProgress, Grid, Stack, useMediaQuery} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import ItemSingleCard from "../../components/cards/ItemSingleCard";
import PageTitle from "../../components/commons/PageTitle";
import CommentCard from "../../components/cards/CommentCard";
import CommentForm from "../../components/forms/CommentForm";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {useEffect} from "react";
import {getItem} from "../../store/asyncThunk/itemsAsyncThunk";
import {setItem} from "../../store/slices/itemsSlice";
import {commentsSelector, itemsSelector} from "../../store/selectors";
import {getItemComments} from "../../store/asyncThunk/commentsAsyncThunk";
import {setComments} from "../../store/slices/commentsSlice";

const ItemsID = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const dispatch = useDispatch()
    const { id } = useParams()

    const { single: item, getSingleLoading } = useSelector(itemsSelector)
    const { content: comments, getLoading } = useSelector(commentsSelector)

    useEffect(() => {
        dispatch(getItem({ id }))
        dispatch(getItemComments({ id }))
        return () => {
            dispatch(setItem(null))
            dispatch(setComments([]))
        }
    }, [dispatch, id])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {
                    getSingleLoading
                    ?
                    <Box height={250}>
                        <CircularProgress/>
                    </Box>
                    :
                    <ItemSingleCard item={item}/>
                }
            </Grid>
            <Grid item xs={12} md={7} lg={8} display={"flex"} justifyContent={"center"}>
                <PageTitle
                    text={"Comments"}
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<CommentIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid xs={0} md={5} item lg={4}/>
            <Grid item xs={12} md={7} lg={8}>
                <Stack
                    spacing={2}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"start"}
                >
                    {
                        getLoading
                        ?
                        <CircularProgress/>
                        :
                        comments?.map(comment => (
                            <CommentCard key={comment.id} comment={comment}/>
                        ))
                    }
                </Stack>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <CommentForm/>
            </Grid>
        </Grid>
    )
}

export default ItemsID