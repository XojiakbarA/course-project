import {
    Box, Breadcrumbs,
    Card,
    CardContent,
    Divider, Grid,
    IconButton,
    Stack, SvgIcon,
    Tooltip,
    Typography,
    useMediaQuery
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EventIcon from "@mui/icons-material/Event";
import CardImage from "../images/CardImage";
import {useEffect, useRef, useState} from "react";
import AvatarImage from "../images/AvatarImage";
import {toggleDeleteCollection, toggleEditCollection} from "../../store/slices/dialogsSlice";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../store/selectors";
import {useTranslation} from "react-i18next";

const CollectionSingleCard = ({ collection }) => {

    const { t } = useTranslation()
    const { user, isAdmin, getLoading } = useSelector(authSelector)

    const dispatch = useDispatch()

    const toggleEditCollectionDialog = () => {
        dispatch(toggleEditCollection())
    }
    const toggleDeleteCollectionDialog = () => {
        dispatch(toggleDeleteCollection())
    }

    const isOwnCollection = user?.id === collection?.user?.id

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const ref = useRef(null)

    const [cardWidth, setCardWidth] = useState(null)

    useEffect(() => {
        setCardWidth(ref.current.offsetWidth)
    }, [])

    return (
        <Card>
            <Grid container>
                <Grid item xs={12} md={5} lg={4} ref={ref}>
                    <CardImage publicId={collection?.image?.value} width={cardWidth} height={250}/>
                </Grid>
                <Grid item xs={12} md={7} lg={8}>
                    <CardContent>
                        <Stack direction={"row"} spacing={1} justifyContent={"end"} alignItems={"center"}>
                            {
                                isOwnCollection || isAdmin
                                ?
                                <>
                                <Tooltip title={ t("edit") }>
                                    <IconButton onClick={toggleEditCollectionDialog} disabled={getLoading}>
                                        <EditIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={ t("delete") }>
                                    <IconButton onClick={toggleDeleteCollectionDialog} disabled={getLoading}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                                </>
                                :
                                <IconButton disabled><SvgIcon/></IconButton>
                            }

                        </Stack>
                        <Stack spacing={1}>
                            <Stack direction={"row"} spacing={1} alignItems={"end"}>
                                <Breadcrumbs>
                                    <Typography variant={isDownSm ? "body1" : "h6"} color={"text.disabled"}>{ collection?.topic.name }</Typography>
                                    <Typography variant={isDownSm ? "h5" : "h4"}>{ collection?.name }</Typography>
                                </Breadcrumbs>
                            </Stack>
                            <Stack
                                direction={"row"}
                                spacing={4}
                                overflow={"scroll"}
                                pb={1}
                                divider={<Divider orientation={"vertical"} flexItem/>}
                            >
                                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                    <AvatarImage publicId={ collection?.user?.image?.value } size={isDownSm ? 30 : 40}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>{ t("user") }</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"}>
                                            { collection?.user.firstName }
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                    <AttachFileIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>{ t("items") }</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"}>
                                            { collection?.itemsCount }
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                    <EventIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                                    <Box>
                                        <Typography variant={"caption"} color={"primary"}>{ t("createdAt") }</Typography>
                                        <Typography variant={isDownSm ? "body2" : "body1"} whiteSpace={"nowrap"}>
                                            { new Date(collection?.createdAt).toLocaleString() }
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                            <Typography variant={"body2"}>
                                { collection?.description }
                            </Typography>
                        </Stack>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    )
}

export default CollectionSingleCard