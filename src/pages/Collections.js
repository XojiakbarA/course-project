import {Avatar, Chip, Grid, IconButton, Link, Paper, Stack, Tooltip, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from '@mui/icons-material/Image';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import {DataGrid, GridFilterPanel} from "@mui/x-data-grid";
import CollectionSingleCard from "../components/cards/CollectionSingleCard";
import {toggleDeleteCollection, toggleEditCollection} from "../store/slices/dialogsSlice";
import {useDispatch} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import MyGridToolbar from "../components/data-grid/MyGridToolbar";

const Collections = () => {

    const dispatch = useDispatch()

    const toggleEditCollectionDialog = () => {
        dispatch(toggleEditCollection())
    }
    const toggleDeleteCollectionDialog = () => {
        dispatch(toggleDeleteCollection())
    }

    const columns = [
        {
            flex: 1,
            minWidth: 80,
            field: 'id',
            headerName: 'ID'
        },
        {
            flex: 2,
            minWidth: 150,
            field: 'title',
            headerName: 'Title',
            renderCell: ({ row }) => <Link component={RouterLink} to={`/items/${row.id}`}>{row.title}</Link>
        },
        {
            flex: 1,
            minWidth: 80,
            field: 'image',
            headerName: 'Image',
            renderCell: () => <Avatar sx={{ width: 30, height: 30 }}><ImageIcon fontSize={"small"}/></Avatar>
        },
        {
            flex: 2,
            minWidth: 250,
            field: 'tags',
            headerName: 'Tags',
            sortable: false,
            renderCell: ({ value }) => (
                <Stack direction={"row"} spacing={1}>
                    {
                        value.map(item => (
                            <Chip size={"small"} key={item} label={item}/>
                        ))
                    }
                </Stack>
            )
        },
        {
            flex: 1,
            minWidth: 100,
            field: 'likes',
            renderHeader: () => (
                <Stack direction={"row"} spacing={1}>
                    <ThumbUpIcon fontSize={"small"}/>
                    <Typography variant={"body2"}>Likes</Typography>
                </Stack>
            ),
            renderCell: ({ value }) => <Chip size={"small"} label={value} variant={"outlined"}/>
        },
        {
            flex: 1,
            minWidth: 100,
            field: 'comments',
            renderHeader: () => (
                <Stack direction={"row"} spacing={1}>
                    <CommentIcon fontSize={"small"}/>
                    <Typography variant={"body2"}>Comments</Typography>
                </Stack>
            ),
            renderCell: ({ value }) => <Chip size={"small"} label={value} variant={"outlined"}/>
        },
        {
            width: 120,
            field: "actions",
            headerName: 'Actions',
            filterable: false,
            sortable: false,
            renderCell: () => (
                <Stack direction={"row"} spacing={1}>
                    <Tooltip title={"Edit"}>
                        <IconButton>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Delete"}>
                        <IconButton>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </Stack>
            )
        }
    ]
    const rows = [
        { id: 1, title: "Xiaomi Mi 9T Pro", tags: ["#smartphones", "#gadgets"], likes: 143, comments: 84 },
        { id: 2, title: "Xiaomi Mi Band 3", tags: ["#smartwatches", "#gadgets"], likes: 45, comments: 12 },
    ]

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={5} lg={4}>
                <Avatar
                    variant={"rounded"}
                    sx={{ width: "100%", minHeight: 250 }}
                >
                    <ImageIcon sx={{ transform: "scale(3)" }}/>
                </Avatar>
            </Grid>
            <Grid item xs={12} md={7} lg={8}>
                <CollectionSingleCard
                    onEditClick={toggleEditCollectionDialog}
                    onDeleteClick={toggleDeleteCollectionDialog}
                />
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <DataGrid
                        autoHeight
                        disableColumnMenu
                        columns={columns}
                        rows={rows}
                        components={{ Toolbar: MyGridToolbar, FilterPanel: GridFilterPanel }}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Collections