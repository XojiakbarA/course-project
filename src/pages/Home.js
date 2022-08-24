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
import {collectionsSelector, itemsSelector, tagsSelector} from "../store/selectors";
import {getTags} from "../store/asyncThunk/tagsAsyncThunk";
import {setItems} from "../store/slices/itemsSlice";
import {setTags} from "../store/slices/tagsSlice";
import ItemListSkeleton from "../components/skeletons/ItemListSkeleton";
import {getCollections} from "../store/asyncThunk/collectionsAsyncThunk";
import {setCollections} from "../store/slices/collectionsSlice";
import CollectionListSkeleton from "../components/skeletons/CollectionListSkeleton";

const Home = () => {

    const dispatch = useDispatch()

    const { content: items, getLoading: itemsGetLoading } = useSelector(itemsSelector)
    const { content: tags, getLoading: tagsGetLoading } = useSelector(tagsSelector)
    const { content: collections, getLoading: collectionsGetLoading } = useSelector(collectionsSelector)

    const size = 5
    const skeletonSize = Array.from({length: size}, (_, i) => i)
    const sx = { display: "inline-block", mr: 2, width: 320, position: "relative", height: "100%" }

    useEffect(() => {
        const params = { size, sortBy: "createdAt", sortType: "DESC" }
        dispatch(getItems({ params }))
        dispatch(getCollections({ params }))
        dispatch(getTags())
    }, [dispatch])
    useEffect(() => {
        return () => {
            dispatch(setItems([]))
            dispatch(setCollections([]))
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
                <Box whiteSpace={"nowrap"} overflow={"scroll"} pb={1}>
                    {
                        itemsGetLoading
                        ?
                        skeletonSize.map(skeleton => (
                            <ItemListSkeleton key={skeleton} sx={sx}/>
                        ))
                        :
                        items.map(item => (
                            <ItemListCard key={item.id} item={item} sx={sx}/>
                        ))
                    }
                </Box>
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
                <Box whiteSpace={"nowrap"} overflow={"scroll"} pb={1}>
                    {
                        itemsGetLoading
                            ?
                            skeletonSize.map(skeleton => (
                                <CollectionListSkeleton key={skeleton} sx={sx}/>
                            ))
                            :
                            collections.map(collection => (
                                <CollectionListCard key={collection.id} collection={collection} sx={sx}/>
                            ))
                    }
                </Box>
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