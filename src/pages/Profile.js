import {CircularProgress, Grid, Paper, useMediaQuery} from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import UserEditForm from "../components/forms/UserEditForm";
import PageTitle from "../components/commons/PageTitle";
import CollectionListCard from "../components/cards/CollectionListCard";
import {toggleCreateCollection, toggleDeleteCollection, toggleEditCollection} from "../store/slices/dialogsSlice";
import {useDispatch, useSelector} from "react-redux";
import UserImageEditForm from "../components/forms/UserImageEditForm";
import {useEffect} from "react";
import {getUserCollections} from "../store/asyncThunk/collectionsAsyncThunk";
import {authSelector, collectionsSelector} from "../store/selectors";
import CollectionAddCard from "../components/cards/CollectionAddCard";
import {setCollection, setCollections} from "../store/slices/collectionsSlice";

const Profile = () => {

    const dispatch = useDispatch()

    const { content: collections, loading } = useSelector(collectionsSelector)

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

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const { user } = useSelector(authSelector)

    useEffect(() => {
        if (user?.id) {
            dispatch(getUserCollections({ id: user?.id }))
        }
        return () => {
            dispatch(setCollections([]))
        }
    }, [dispatch, user?.id])

    return (
        <Grid container spacing={2} direction={isDownSm ? "column-reverse" : "row"}>
            <Grid item xs={12} sm={6} md={8} lg={9} order={{ xs: 2, sm: 1 }} display={"flex"} justifyContent={"center"}>
                <PageTitle
                    text={"Collections"}
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<CategoryIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid item xs={0} sm={6} md={4} lg={3} order={{ sm: 2 }}/>
            <Grid item xs={12} sm={6} md={8} lg={9} order={{ xs: 1, sm: 3 }}>
                <Grid container spacing={2}>
                    {
                        loading
                        ?
                        <Grid item  xs={12} md={6} lg={4}>
                            <CircularProgress/>
                        </Grid>
                        :
                        collections.map(collection => (
                            <Grid key={collection.id} item xs={12} md={6} lg={4}>
                                <CollectionListCard
                                    onEditClick={toggleEditCollectionDialog}
                                    onDeleteClick={toggleDeleteCollectionDialog}
                                    collection={collection}
                                />
                            </Grid>
                        ))
                    }
                    {
                        !loading
                        &&
                        <Grid item xs={12} md={6} lg={4}>
                            <CollectionAddCard onClick={toggleCreateCollectionDialog}/>
                        </Grid>
                    }
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} order={{ xs: 3, sm: 4 }}>
                <Paper sx={{ p: 3 }}>
                    <UserImageEditForm/>
                    <UserEditForm/>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Profile