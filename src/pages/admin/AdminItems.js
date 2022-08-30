import {Chip, Grid, IconButton, Link, Paper, Stack, Tooltip, Typography, useMediaQuery} from "@mui/material";
import PageTitle from "../../components/commons/PageTitle";
import CategoryIcon from "@mui/icons-material/Category";
import InfiniteScroll from "react-infinite-scroll-component";
import {DataGrid, GridFilterPanel} from "@mui/x-data-grid";
import MyGridToolbar from "../../components/data-grid/MyGridToolbar";
import {itemsSelector, tagsSelector} from "../../store/selectors";
import ItemDialogsWrapper from "../../components/dialogs/ItemDialogsWrapper";
import {useDispatch, useSelector} from "react-redux";
import {toggleCreateItem, toggleDeleteItem, toggleEditItem} from "../../store/slices/dialogsSlice";
import {useCallback, useEffect, useMemo, useState} from "react";
import {getItems} from "../../store/asyncThunk/itemsAsyncThunk";
import {setFetchItemsType, setItem, setItems} from "../../store/slices/itemsSlice";
import {FETCH_ITEMS} from "../../store/fetchTypes";
import {Link as RouterLink} from "react-router-dom";
import AvatarImage from "../../components/images/AvatarImage";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {setTags} from "../../store/slices/tagsSlice";
import {getTags} from "../../store/asyncThunk/tagsAsyncThunk";

const AdminItems = () => {

    const dispatch = useDispatch()

    const { content: items, hasMore, getLoading } = useSelector(itemsSelector)
    const { content: tags } = useSelector(tagsSelector)

    const [page, setPage] = useState(0)
    const params = useMemo(() => ({ sortBy: "createdAt", sortType: "DESC", size: 30, page }), [page])

    useEffect(() => {
        dispatch(getTags())
        dispatch(getItems({ params }))
    }, [dispatch, params])
    useEffect(() => {
        return () => {
            dispatch(setTags([]))
            dispatch(setItems([]))
            dispatch(setItem([]))
        }
    }, [dispatch])

    const toggleEditItemDialog = useCallback((item) => {
        dispatch(setItem(item))
        dispatch(toggleEditItem())
    }, [dispatch])
    const toggleDeleteItemDialog = useCallback((item) => {
        dispatch(setFetchItemsType(FETCH_ITEMS))
        dispatch(setItem(item))
        dispatch(toggleDeleteItem())
    }, [dispatch])
    const toggleCreateItemDialog = () => {
        dispatch(toggleCreateItem())
    }
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
                minWidth: 150,
                field: 'name',
                headerName: 'Name',
                type: "string",
                renderCell: ({ row }) => <Link component={RouterLink} to={`/items/${row.id}`}>{row.name}</Link>
            },
            {
                flex: 2,
                minWidth: 150,
                field: 'collection',
                headerName: 'Collection Name',
                type: "string",
                renderCell: ({ value }) => <Link component={RouterLink} to={`/collections/${value.id}`}>{value.name}</Link>
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
    ), [toggleEditItemDialog, toggleDeleteItemDialog, tags])

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
                            components={{ Toolbar: MyGridToolbar, FilterPanel: GridFilterPanel }}
                            componentsProps={{
                                toolbar: { onClick: toggleCreateItemDialog, buttonText: "Create Item" },
                                filterPanel: { filterFormProps: { operatorInputProps: { sx: { display: 'none' }} } }
                            }}
                        />
                    </Paper>
                </InfiniteScroll>
            </Grid>
            <ItemDialogsWrapper params={params}/>
        </Grid>
    )
}

export default AdminItems