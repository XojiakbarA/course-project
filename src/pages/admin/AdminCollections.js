import {Grid, IconButton, Link, Paper, Stack, Tooltip, Typography, useMediaQuery} from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import PageTitle from "../../components/commons/PageTitle";
import InfiniteScroll from "react-infinite-scroll-component";
import {DataGrid, GridFilterPanel} from "@mui/x-data-grid";
import MyGridToolbar from "../../components/data-grid/MyGridToolbar";
import {useDispatch, useSelector} from "react-redux";
import {collectionsSelector} from "../../store/selectors";
import {useEffect, useMemo, useState} from "react";
import {getCollections} from "../../store/asyncThunk/collectionsAsyncThunk";
import {setCollection, setCollections, setFetchCollectionsType} from "../../store/slices/collectionsSlice";
import {toggleCreateCollection, toggleDeleteCollection, toggleEditCollection} from "../../store/slices/dialogsSlice";
import {Link as RouterLink} from "react-router-dom";
import AvatarImage from "../../components/images/AvatarImage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {FETCH_COLLECTIONS} from "../../store/fetchTypes";
import CollectionDialogsWrapper from "../../components/dialogs/CollectionDialogsWrapper";

const AdminCollections = () => {

    const dispatch = useDispatch()

    const { content: collections, hasMore, getLoading } = useSelector(collectionsSelector)

    const [page, setPage] = useState(0)
    const params = useMemo(() => ({ sortBy: "createdAt", sortType: "DESC", size: 30, page }), [page])

    useEffect(() => {
        dispatch(getCollections({ params }))
    }, [dispatch, params])
    useEffect(() => {
        return () => {
            dispatch(setCollections([]))
            dispatch(setCollection(null))
        }
    }, [dispatch])

    const toggleEditCollectionDialog = (collection) => {
        dispatch(setCollection(collection))
        dispatch(toggleEditCollection())
    }
    const toggleDeleteCollectionDialog = (collection) => {
        dispatch(setFetchCollectionsType(FETCH_COLLECTIONS))
        dispatch(setCollection(collection))
        dispatch(toggleDeleteCollection())
    }
    const toggleCreateCollectionDialog = () => {
        dispatch(toggleCreateCollection())
    }
    const handleNext = () => {
        setPage(prev => prev + 1)
    }

    const columns = [
        {
            flex: 1,
            minWidth: 80,
            field: 'id',
            headerName: 'ID',
            type: "number",
            filterable: false,
            sortable: false
        },
        {
            flex: 2,
            minWidth: 150,
            field: 'name',
            headerName: 'Name',
            type: "string",
            renderCell: ({ row }) => <Link component={RouterLink} to={`/collections/${row.id}`}>{row.name}</Link>
        },
        {
            flex: 3,
            minWidth: 200,
            field: 'description',
            headerName: 'Description',
            type: "string",
        },
        {
            flex: 2,
            minWidth: 150,
            field: 'topic',
            headerName: 'Topic Name',
            type: "string",
            valueGetter: ({ value }) => value.name
        },
        {
            flex: 2,
            minWidth: 150,
            field: 'user',
            headerName: 'User',
            type: "string",
            renderCell: ({ value }) => (
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <AvatarImage size={30} publicId={value?.image?.value}/>
                    <Typography variant={"body2"}>{value.firstName}</Typography>
                </Stack>
            )
        },
        {
            flex: 1.5,
            minWidth: 150,
            field: 'createdAt',
            headerName: 'Created At',
            type: "dateTime",
            renderCell: ({ value }) => value ? new Date(value).toLocaleString() : null
        },
        {
            width: 120,
            field: "actions",
            headerName: 'Actions',
            filterable: false,
            sortable: false,
            renderCell: ({ row }) => (
                <Stack direction={"row"} spacing={1}>
                    <Tooltip title={"Edit"}>
                        <IconButton onClick={ e => toggleEditCollectionDialog(row) }>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Delete"}>
                        <IconButton onClick={ e => toggleDeleteCollectionDialog(row) }>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </Stack>
            )
        }
    ]

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    text={"Collections"}
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<CategoryIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid item xs={12}>
                <InfiniteScroll
                    style={{ overflow: "visible" }}
                    dataLength={collections.length}
                    next={handleNext}
                    hasMore={hasMore}
                >
                    <Paper>
                        <DataGrid
                            autoHeight
                            disableColumnMenu
                            hideFooter
                            loading={getLoading}
                            columns={columns}
                            rows={collections}
                            components={{ Toolbar: MyGridToolbar, FilterPanel: GridFilterPanel }}
                            componentsProps={{
                                toolbar: { onClick: toggleCreateCollectionDialog, buttonText: "Create Collection" },
                                filterPanel: { filterFormProps: { operatorInputProps: { sx: { display: 'none' }} } }
                            }}
                        />
                    </Paper>
                </InfiniteScroll>
            </Grid>
            <CollectionDialogsWrapper params={params}/>
        </Grid>
    )
}

export default AdminCollections