import {Card, CardActionArea, Grid, Paper, Stack, Typography, useMediaQuery} from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import UserEditForm from "../components/forms/UserEditForm";
import PageTitle from "../components/commons/PageTitle";
import CollectionListCard from "../components/cards/CollectionListCard";
import {toggleCreateCollection, toggleDeleteCollection, toggleEditCollection} from "../store/slices/dialogsSlice";
import {useDispatch} from "react-redux";

const Profile = () => {

    const dispatch = useDispatch()

    const toggleCreateCollectionDialog = () => {
        dispatch(toggleCreateCollection())
    }
    const toggleEditCollectionDialog = () => {
        dispatch(toggleEditCollection())
    }
    const toggleDeleteCollectionDialog = () => {
        dispatch(toggleDeleteCollection())
    }

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const array = [1, 2, 3, 4, 5, 6, 7, 8]

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
                        array.map(item => (
                            <Grid key={item} item xs={12} md={6} lg={4}>
                                <CollectionListCard
                                    onEditClick={toggleEditCollectionDialog}
                                    onDeleteClick={toggleDeleteCollectionDialog}
                                />
                            </Grid>
                        ))
                    }
                    <Grid item xs={12} md={6} lg={4}>
                        <Card sx={{ height: "100%", minHeight: 400 }}>
                            <CardActionArea
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                                onClick={toggleCreateCollectionDialog}
                            >
                                <Stack spacing={3} alignItems={"center"}>
                                    <AddToPhotosIcon sx={{ transform: "scale(2)" }} color={"primary"}/>
                                    <Typography variant={"body2"} color={"primary"}>Create Collection</Typography>
                                </Stack>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} order={{ xs: 3, sm: 4 }}>
                <Paper sx={{ p: 3 }}>
                    <UserEditForm/>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Profile