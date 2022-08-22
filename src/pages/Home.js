import {Box, Chip, CircularProgress, Grid, Link, Stack, useMediaQuery} from "@mui/material";
import {Link as RouterLink} from "react-router-dom"
import PageTitle from "../components/commons/PageTitle";
import CategoryIcon from "@mui/icons-material/Category";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TagIcon from '@mui/icons-material/Tag';
import ItemListCard from "../components/cards/ItemListCard";
import CollectionListCard from "../components/cards/CollectionListCard";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getItems} from "../store/asyncThunk/itemsAsyncThunk";
import {itemsSelector, tagsSelector} from "../store/selectors";
import {getTags} from "../store/asyncThunk/tagsAsyncThunk";
import {setItems} from "../store/slices/itemsSlice";
import {setTags} from "../store/slices/tagsSlice";

const collections = [1, 2, 3, 4, 5]

const Home = () => {

    const dispatch = useDispatch()

    const { content: items, getLoading: itemsGetLoading } = useSelector(itemsSelector)
    const { content: tags, getLoading: tagsGetLoading } = useSelector(tagsSelector)

    useEffect(() => {
        const itemsParams = { size: 5, sortBy: "createdAt", sortType: "DESC" }
        dispatch(getItems({ params: itemsParams }))
        dispatch(getTags())
        return () => {
            dispatch(setItems([]))
            dispatch(setTags([]))
        }
    }, [dispatch])

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                    <PageTitle
                        text={"Last Items"}
                        variant={isDownSm ? "h5" : "h4"}
                        color={"primary"}
                        icon={<AttachFileIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                    />
                    <Link component={RouterLink} to={"/items"}>View All</Link>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                {
                    itemsGetLoading
                    ?
                    <Grid item xs={12} sm={6} md={4} lg={3} height={402}>
                        <CircularProgress/>
                    </Grid>
                    :
                    items.map(item => (
                        <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                            <ItemListCard item={item}/>
                        </Grid>
                    ))
                }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                    <PageTitle
                        text={"The Biggest Collections"}
                        variant={isDownSm ? "h5" : "h4"}
                        color={"primary"}
                        icon={<CategoryIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                    />
                    <Link component={RouterLink} to={"/collections"}>View All</Link>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {
                        collections.map(collection => (
                            <Grid key={collection} item xs={12} sm={6} md={4} lg={3}>
                                <CollectionListCard key={collection}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <PageTitle
                    text={"Tags"}
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<TagIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid item xs={12}>
                <Box>
                    {
                        tagsGetLoading
                        ?
                        <CircularProgress/>
                        :
                        tags.map(tag => (
                            <Chip
                                sx={{ mb: 2, mr: 2 }}
                                key={tag.id}
                                clickable
                                label={tag.name}
                                component={RouterLink}
                                to={`/tags/${tag.id}`}
                            />
                        ))
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

export default Home