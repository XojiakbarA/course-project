import {
    Chip,
    Grid,
    IconButton, LinearProgress,
    Link,
    Paper,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import {DataGrid, GridFilterPanel} from "@mui/x-data-grid";
import CollectionSingleCard from "../../components/cards/CollectionSingleCard";
import {toggleCreateItem, toggleDeleteItem, toggleEditItem} from "../../store/slices/dialogsSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import MyGridToolbar from "../../components/data-grid/MyGridToolbar";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router";
import {getCollectionItems} from "../../store/asyncThunk/itemsAsyncThunk";
import {collectionsSelector, itemsSelector, tagsSelector} from "../../store/selectors";
import {setFetchItemsType, setItem, setItems} from "../../store/slices/itemsSlice";
import {getCollection} from "../../store/asyncThunk/collectionsAsyncThunk";
import {setCollection} from "../../store/slices/collectionsSlice";
import AvatarImage from "../../components/images/AvatarImage";
import {getTags} from "../../store/asyncThunk/tagsAsyncThunk";
import {setTags} from "../../store/slices/tagsSlice";
import CollectionSingleSkeleton from "../../components/skeletons/CollectionSingleSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import {FETCH_COLLECTION_ITEMS} from "../../store/fetchTypes";
import ItemDialogsWrapper from "../../components/dialogs/ItemDialogsWrapper";
import CollectionDialogsWrapper from "../../components/dialogs/CollectionDialogsWrapper";

const CollectionsID = () => {

    const dispatch = useDispatch()
    const { id } = useParams()
    const { content: items, hasMore, getLoading } = useSelector(itemsSelector)
    const { single: collection, getSingleLoading } = useSelector(collectionsSelector)
    const { content: tags } = useSelector(tagsSelector)

    const [page, setPage] = useState(0)
    const params = useMemo(() => ({ sortBy: "createdAt", sortType: "DESC", size: 30, page }), [page])

    useEffect(() => {
        dispatch(getCollection({ id }))
        dispatch(getCollectionItems({ id, params }))
        dispatch(getTags({}))
    }, [dispatch, id, params])
    useEffect(() => {
        return () => {
            dispatch(setCollection(null))
            dispatch(setItems([]))
            dispatch(setItem(null))
            dispatch(setTags([]))
        }
    }, [dispatch])

    const toggleCreateItemDialog = () => {
        dispatch(toggleCreateItem())
    }
    const toggleEditItemDialog = useCallback((item) => {
        dispatch(setItem(item))
        dispatch(toggleEditItem())
    }, [dispatch])
    const toggleDeleteItemDialog = useCallback((item) => {
        dispatch(setFetchItemsType(FETCH_COLLECTION_ITEMS))
        dispatch(setItem(item))
        dispatch(toggleDeleteItem())
    }, [dispatch])
    const handleNext = () => {
        setPage(prev => prev + 1)
    }

    const columns = useMemo(() => (
        [
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
                renderCell: ({ row }) => <Link component={RouterLink} to={`/items/${row.id}`}>{row.name}</Link>
            },
            {
                flex: 1,
                minWidth: 80,
                field: 'image',
                headerName: 'Image',
                type: "string",
                filterable: false,
                sortable: false,
                renderCell: ({ value }) => <AvatarImage size={30} publicId={value?.value} itemImage/>
            },
            {
                flex: 2,
                minWidth: 250,
                field: 'tags',
                headerName: 'Tags',
                type: "singleSelect",
                sortable: false,
                valueOptions: tags?.map(i => i.name),
                renderCell: ({ value }) => (
                    <Stack direction={"row"} spacing={1} overflow={"scroll"} py={2}>
                        {
                            value.map(tag => (
                                <Chip size={"small"} key={tag.id} label={tag.name}/>
                            ))
                        }
                    </Stack>
                )
            },
            {
                flex: 1,
                minWidth: 100,
                field: 'likesCount',
                headerName: "Likes",
                type: "number",
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
                field: 'commentsCount',
                headerName: "Comments",
                type: "number",
                renderHeader: () => (
                    <Stack direction={"row"} spacing={1}>
                        <CommentIcon fontSize={"small"}/>
                        <Typography variant={"body2"}>Comments</Typography>
                    </Stack>
                ),
                renderCell: ({ value }) => <Chip size={"small"} label={value} variant={"outlined"}/>
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
                            <IconButton onClick={ e => toggleEditItemDialog(row) }>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Delete"}>
                            <IconButton onClick={ e => toggleDeleteItemDialog(row) }>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )
            }
        ]
    ), [tags, toggleDeleteItemDialog, toggleEditItemDialog])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {
                    getSingleLoading
                    ?
                    <CollectionSingleSkeleton/>
                    :
                    <CollectionSingleCard collection={collection}/>
                }
            </Grid>
            <Grid item xs={12}>
                <InfiniteScroll
                    style={{ overflow: "visible" }}
                    dataLength={items.length}
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
                            rows={items}
                            components={{ Toolbar: MyGridToolbar, FilterPanel: GridFilterPanel, LoadingOverlay: LinearProgress }}
                            componentsProps={{
                                toolbar: { onClick: toggleCreateItemDialog, buttonText: "Create Item" },
                                filterPanel: { filterFormProps: { operatorInputProps: { sx: { display: 'none' }} } }
                            }}
                        />
                    </Paper>
                </InfiniteScroll>
            </Grid>
            <CollectionDialogsWrapper/>
            <ItemDialogsWrapper params={params}/>
        </Grid>
    )
}

export default CollectionsID