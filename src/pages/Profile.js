import {Card, CardActionArea, Grid, Paper, Stack, Typography, useMediaQuery} from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import EditIcon from '@mui/icons-material/Edit';
import UserEditForm from "../components/forms/UserEditForm";
import PageTitle from "../components/commons/PageTitle";
import CollectionCard from "../components/cards/CollectionCard";
import CommonDialog from "../components/dialogs/CommonDialog";
import {useState} from "react";
import ConfirmDialog from "../components/dialogs/ConfirmDialog";
import CollectionForm from "../components/forms/CollectionForm";

const Profile = () => {

    const [createDialog, setCreateDialog] = useState(false)
    const [editDialog, setEditDialog] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)

    const toggleCreateDialog = () => setCreateDialog(prev => !prev)
    const toggleEditDialog = () => setEditDialog(prev => !prev)
    const toggleDeleteDialog = () => setDeleteDialog(prev => !prev)

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
                                <CollectionCard
                                    onEditClick={toggleEditDialog}
                                    onDeleteClick={toggleDeleteDialog}
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
                                onClick={toggleCreateDialog}
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
            <CommonDialog
                title={"Create Collection"}
                maxWidth={"md"}
                open={createDialog}
                onClose={toggleCreateDialog}
            >
                <CollectionForm
                    buttonText={"Create"}
                    buttonIcon={<AddToPhotosIcon/>}
                    onCancelClick={toggleCreateDialog}
                />
            </CommonDialog>
            <CommonDialog
                title={"Edit Collection"}
                maxWidth={"md"}
                open={editDialog}
                onClose={toggleEditDialog}
            >
                <CollectionForm
                    buttonText={"Edit"}
                    buttonIcon={<EditIcon/>}
                    onCancelClick={toggleEditDialog}
                />
            </CommonDialog>
            <ConfirmDialog
                open={deleteDialog}
                onClose={toggleDeleteDialog}
                content={"Do you really want to delete the collection?"}
            />
        </Grid>
    )
}

export default Profile