import {Chip, Grid, IconButton, Link, Paper, Stack, Tooltip, Typography, useMediaQuery} from "@mui/material";
import PageTitle from "../../components/commons/PageTitle";
import AttachFileIcon from '@mui/icons-material/AttachFile';
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
import {useTranslation} from "react-i18next";

const AdminItems = () => {

    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { content: items, hasMore, getLoading } = useSelector(itemsSelector)
    const { content: tags } = useSelector(tagsSelector)

    const [page, setPage] = useState(0)
    const params = useMemo(() => ({ sortBy: "createdAt", sortType: "DESC", size: 30, page }), [page])

    useEffect(() => {
        dispatch(getItems({ params }))
    }, [dispatch, params])
    useEffect(() => {
        return () => {
            dispatch(setItems([]))
            dispatch(setItem(null))
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
                headerName: t('image'),
                type: "string",
                filterable: false,
                sortable: false,
                renderCell: ({ value }) => <AvatarImage size={30} publicId={value?.value} itemImage/>
            },
            {
                flex: 2,
                minWidth: 150,
                field: 'name',
                headerName: t('name'),
                type: "string",
                renderCell: ({ row }) => <Link component={RouterLink} to={`/items/${row.id}`}>{row.name}</Link>
            },
            {
                flex: 2,
                minWidth: 150,
                field: 'collection',
                headerName: t('collectionName'),
                type: "string",
                renderCell: ({ value }) => <Link component={RouterLink} to={`/collections/${value.id}`}>{value.name}</Link>
            },
            {
                flex: 2,
                minWidth: 250,
                field: 'tags',
                headerName: t('tags'),
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
                headerName: t("likes"),
                type: "number",
                renderHeader: () => (
                    <Stack direction={"row"} spacing={1}>
                        <ThumbUpIcon fontSize={"small"}/>
                        <Typography variant={"body2"}>{ t("likes") }</Typography>
                    </Stack>
                ),
                renderCell: ({ value }) => <Chip size={"small"} label={value} variant={"outlined"}/>
            },
            {
                flex: 1,
                minWidth: 100,
                field: 'commentsCount',
                headerName: t("comments"),
                type: "number",
                renderHeader: () => (
                    <Stack direction={"row"} spacing={1}>
                        <CommentIcon fontSize={"small"}/>
                        <Typography variant={"body2"}>{ t("comments") }</Typography>
                    </Stack>
                ),
                renderCell: ({ value }) => <Chip size={"small"} label={value} variant={"outlined"}/>
            },
            {
                flex: 1.5,
                minWidth: 150,
                field: 'createdAt',
                headerName: t('createdAt'),
                type: "dateTime",
                renderCell: ({ value }) => value ? new Date(value).toLocaleString() : null
            },
            {
                width: 120,
                field: "actions",
                headerName: t('actions'),
                filterable: false,
                sortable: false,
                renderCell: ({ row }) => (
                    <Stack direction={"row"} spacing={1}>
                        <Tooltip title={ t("edit") }>
                            <IconButton onClick={ e => toggleEditItemDialog(row) }>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={ t("delete") }>
                            <IconButton onClick={ e => toggleDeleteItemDialog(row) }>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )
            }
        ]
    ), [toggleEditItemDialog, toggleDeleteItemDialog, tags, t])

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    text={ t("items") }
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<AttachFileIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
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
                                toolbar: { onClick: toggleCreateItemDialog, buttonText: t("createItem") },
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