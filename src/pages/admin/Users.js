import {Chip, Grid, IconButton, Paper, Stack, Tooltip, Typography, useMediaQuery} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import {DataGrid, GridFilterPanel} from "@mui/x-data-grid";
import AvatarImage from "../../components/images/AvatarImage";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useState} from "react";
import {dialogsSelector, usersSelector} from "../../store/selectors";
import {deleteUser, getUsers} from "../../store/asyncThunk/usersAsyncThunk";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {setUser, setUsers} from "../../store/slices/usersSlice";
import {toggleCreateUser, toggleDeleteUser, toggleEditUser} from "../../store/slices/dialogsSlice";
import MyGridToolbar from "../../components/data-grid/MyGridToolbar";
import InfiniteScroll from "react-infinite-scroll-component";
import PageTitle from "../../components/commons/PageTitle";
import ConfirmDialog from "../../components/dialogs/ConfirmDialog";

const Users = () => {

    const dispatch = useDispatch()

    const { user: userDialog } = useSelector(dialogsSelector)

    const { content: users, single: user, hasMore, getLoading, deleteLoading } = useSelector(usersSelector)

    const [page, setPage] = useState(0)
    const params = useMemo(() => ({ sortBy: "createdAt", sortType: "DESC", size: 30, page }), [page])

    useEffect(() => {
        dispatch(getUsers({ params }))
    }, [dispatch, params])
    useEffect(() => {
        return () => {
            dispatch(setUsers([]))
            dispatch(setUser(null))
        }
    }, [dispatch])

    const toggleCreateUserDialog = () => {
        dispatch(toggleCreateUser())
    }
    const toggleEditUserDialog = useCallback((user) => {
        dispatch(setUser(user))
        dispatch(toggleEditUser())
    }, [dispatch])
    const openDeleteUserDialog = useCallback((user) => {
        dispatch(setUser(user))
        dispatch(toggleDeleteUser())
    }, [dispatch])
    const closeDeleteUserDialog = () => {
        dispatch(toggleDeleteUser())
    }
    const handleUserDeleteClick = () => {
        dispatch(deleteUser({ id: user?.id, params }))
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
                renderCell: ({ value }) => <AvatarImage size={30} publicId={value?.value}/>
            },
            {
                flex: 2,
                minWidth: 150,
                field: 'firstName',
                headerName: 'First Name',
                type: "string"
            },
            {
                flex: 2,
                minWidth: 150,
                field: 'lastName',
                headerName: 'Last Name',
                type: "string"
            },
            {
                flex: 2,
                minWidth: 150,
                field: 'email',
                headerName: 'Email',
                type: "string"
            },
            {
                flex: 2,
                minWidth: 150,
                field: 'provider',
                headerName: 'Provider',
                type: "boolean",
                renderCell: ({ value }) => (
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        {
                            value === "google" ? <GoogleIcon color={"primary"}/>
                                : value === "facebook" ? <FacebookIcon color={"primary"}/>
                                    : value === "github" ? <GitHubIcon color={"primary"}/>
                                        : <ArticleIcon color={"primary"}/>
                        }
                        <Typography variant={"body2"}>{value}</Typography>
                    </Stack>
                )
            },
            {
                flex: 2,
                minWidth: 150,
                field: 'isNonLocked',
                headerName: 'Status',
                type: "boolean",
                renderCell: ({ value }) => (
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        { value ? <LockOpenIcon color={"success"}/> : <LockIcon color={"error"}/> }
                        { value ? <Typography variant={"body2"}>unlocked</Typography> : <Typography variant={"body2"}>locked</Typography> }
                    </Stack>
                )

            },
            {
                flex: 2.5,
                minWidth: 150,
                field: 'roles',
                headerName: 'Roles',
                type: "string",
                renderCell: ({ value }) => (
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        {
                            value.map(role => (
                                <Chip
                                    size={"small"}
                                    key={role.id}
                                    label={role.name}
                                    icon={role.name === "ADMIN" ? <SecurityIcon/> : <PersonIcon/>}
                                    variant={role.name !== "ADMIN" ? "outlined" : "filled"}
                                    color={role.name === "ADMIN" ? "secondary" : "primary"}
                                />
                            ))
                        }
                    </Stack>
                )
            },
            {
                flex: 1.5,
                minWidth: 150,
                field: 'createdAt',
                headerName: 'Registered At',
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
                            <IconButton onClick={ e => toggleEditUserDialog(row) }>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Delete"}>
                            <IconButton onClick={ e => openDeleteUserDialog(row) }>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )
            }
        ]
    ), [toggleEditUserDialog, openDeleteUserDialog])

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    text={"Users"}
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<PeopleIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid item xs={12}>
                <InfiniteScroll
                    style={{ overflow: "visible" }}
                    dataLength={users.length}
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
                        rows={users}
                        components={{ Toolbar: MyGridToolbar, FilterPanel: GridFilterPanel }}
                        componentsProps={{
                            toolbar: { onClick: toggleCreateUserDialog, buttonText: "Create User" },
                            filterPanel: { filterFormProps: { operatorInputProps: { sx: { display: 'none' }} } }
                        }}
                    />
                </Paper>
                </InfiniteScroll>
            </Grid>
            <ConfirmDialog
                open={userDialog.delete}
                onClose={closeDeleteUserDialog}
                onConfirmClick={handleUserDeleteClick}
                loading={deleteLoading}
                content={"Do you really want to delete the user?"}
            />
        </Grid>
    )
}

export default Users