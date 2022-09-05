import {Grid, IconButton, Link, Paper, Stack, Tooltip, Typography, useMediaQuery} from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import PageTitle from "../../components/commons/PageTitle";
import InfiniteScroll from "react-infinite-scroll-component";
import {DataGrid, GridFilterPanel} from "@mui/x-data-grid";
import MyGridToolbar from "../../components/data-grid/MyGridToolbar";
import {useDispatch, useSelector} from "react-redux";
import {collectionsSelector} from "../../store/selectors";
import {useCallback, useEffect, useMemo, useState} from "react";
import {getCollections} from "../../store/asyncThunk/collectionsAsyncThunk";
import {setCollection, setCollections, setFetchCollectionsType} from "../../store/slices/collectionsSlice";
import {toggleCreateCollection, toggleDeleteCollection, toggleEditCollection} from "../../store/slices/dialogsSlice";
import {Link as RouterLink} from "react-router-dom";
import AvatarImage from "../../components/images/AvatarImage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {FETCH_COLLECTIONS} from "../../store/fetchTypes";
import CollectionDialogsWrapper from "../../components/dialogs/CollectionDialogsWrapper";
import {useTranslation} from "react-i18next";

const AdminCollections = () => {

    const dispatch = useDispatch()
    const { t } = useTranslation()
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

    const toggleEditCollectionDialog = useCallback((collection) => {
        dispatch(setCollection(collection))
        dispatch(toggleEditCollection())
    }, [dispatch])
    const toggleDeleteCollectionDialog = useCallback((collection) => {
        dispatch(setFetchCollectionsType(FETCH_COLLECTIONS))
        dispatch(setCollection(collection))
        dispatch(toggleDeleteCollection())
    }, [dispatch])
    const toggleCreateCollectionDialog = () => {
        dispatch(toggleCreateCollection())
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
                renderCell: ({ row }) => <Link component={RouterLink} to={`/collections/${row.id}`}>{row.name}</Link>
            },
            {
                flex: 3,
                minWidth: 200,
                field: 'description',
                headerName: t('description'),
                type: "string",
            },
            {
                flex: 2,
                minWidth: 150,
                field: 'topic',
                headerName: t('topicName'),
                type: "string",
                valueGetter: ({ value }) => value.name
            },
            {
                flex: 2,
                minWidth: 150,
                field: 'user',
                headerName: t('user'),
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
                            <IconButton onClick={ e => toggleEditCollectionDialog(row) }>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={ t("delete") }>
                            <IconButton onClick={ e => toggleDeleteCollectionDialog(row) }>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )
            }
        ]
    ), [toggleEditCollectionDialog, toggleDeleteCollectionDialog, t])

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    text={ t("collections") }
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
                                toolbar: { onClick: toggleCreateCollectionDialog, buttonText: t("createCollection") },
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