import {Grid, IconButton, Paper, Stack, Tooltip, Typography, useMediaQuery} from "@mui/material";
import PageTitle from "../../components/commons/PageTitle";
import CommentIcon from '@mui/icons-material/Comment';
import InfiniteScroll from "react-infinite-scroll-component";
import {DataGrid, GridFilterPanel} from "@mui/x-data-grid";
import MyGridToolbar from "../../components/data-grid/MyGridToolbar";
import {useDispatch, useSelector} from "react-redux";
import {commentsSelector} from "../../store/selectors";
import {useCallback, useEffect, useMemo, useState} from "react";
import {toggleCreateComment, toggleDeleteComment, toggleEditComment} from "../../store/slices/dialogsSlice";
import AvatarImage from "../../components/images/AvatarImage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {getComments} from "../../store/asyncThunk/commentsAsyncThunk";
import {setComment, setComments} from "../../store/slices/commentsSlice";
import CommentDialogsWrapper from "../../components/dialogs/CommentDialogsWrapper";
import {useTranslation} from "react-i18next";

const Comments = () => {

    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { content: comments, hasMore, getLoading } = useSelector(commentsSelector)

    const [page, setPage] = useState(0)
    const params = useMemo(() => ({ sortBy: "createdAt", sortType: "DESC", size: 30, page }), [page])

    useEffect(() => {
        dispatch(getComments({ params }))
    }, [dispatch, params])
    useEffect(() => {
        return () => {
            dispatch(setComments([]))
        }
    }, [dispatch])

    const toggleEditCommentDialog = useCallback((comment) => {
        dispatch(setComment(comment))
        dispatch(toggleEditComment())
    }, [dispatch])
    const toggleDeleteCommentDialog = useCallback((comment) => {
        dispatch(setComment(comment))
        dispatch(toggleDeleteComment())
    }, [dispatch])
    const toggleCreateCommentDialog = () => {
        dispatch(toggleCreateComment())
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
                flex: 3,
                minWidth: 200,
                field: 'text',
                headerName: t('text'),
                type: "string",
                filterable: false,
                sortable: false
            },
            {
                flex: 2,
                minWidth: 150,
                field: 'user',
                headerName: t('userName'),
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
                            <IconButton onClick={ e => toggleEditCommentDialog(row) }>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={ t("delete") }>
                            <IconButton onClick={ e => toggleDeleteCommentDialog(row) }>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )
            }
        ]
    ), [toggleEditCommentDialog, toggleDeleteCommentDialog])

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    text={ t("comments") }
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<CommentIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid item xs={12}>
                <InfiniteScroll
                    style={{ overflow: "visible" }}
                    dataLength={comments.length}
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
                            rows={comments}
                            components={{ Toolbar: MyGridToolbar, FilterPanel: GridFilterPanel }}
                            componentsProps={{
                                toolbar: { onClick: toggleCreateCommentDialog, buttonText: t("createComment") },
                                filterPanel: { filterFormProps: { operatorInputProps: { sx: { display: 'none' }} } }
                            }}
                        />
                    </Paper>
                </InfiniteScroll>
            </Grid>
            <CommentDialogsWrapper params={params}/>
        </Grid>
    )
}

export default Comments