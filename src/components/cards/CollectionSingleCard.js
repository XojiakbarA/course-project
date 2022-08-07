import {
    Avatar,
    Box, Breadcrumbs,
    Card,
    CardContent,
    Divider,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useMediaQuery
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EventIcon from "@mui/icons-material/Event";

const CollectionSingleCard = ({ onEditClick, onDeleteClick }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Card sx={{ minHeight: "100%" }}>
            <CardContent>
                <Stack spacing={4}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack direction={"row"} spacing={1} alignItems={"end"}>
                            <Breadcrumbs>
                                <Typography variant={isDownSm ? "body1" : "h6"} color={"text.disabled"}>Topic 1</Typography>
                                <Typography variant={isDownSm ? "h5" : "h4"}>Collection 1</Typography>
                            </Breadcrumbs>
                        </Stack>
                        <Stack direction={"row"} spacing={1}>
                            <Tooltip title={"Edit"}>
                                <IconButton onClick={onEditClick}>
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Delete"}>
                                <IconButton onClick={onDeleteClick}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                    <Stack
                        direction={"row"}
                        spacing={4}
                        overflow={"scroll"}
                        pb={1}
                        divider={<Divider orientation={"vertical"} flexItem/>}
                    >
                        <Stack spacing={2} direction={"row"} alignItems={"center"}>
                            <Avatar sx={{ width: isDownSm ? 30 : 40, height: isDownSm ? 30 : 40 }}/>
                            <Box>
                                <Typography variant={"caption"} color={"primary"}>User</Typography>
                                <Typography variant={isDownSm ? "body2" : "body1"}>Xojiakbar</Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={2} direction={"row"} alignItems={"center"}>
                            <AttachFileIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                            <Box>
                                <Typography variant={"caption"} color={"primary"}>Items</Typography>
                                <Typography variant={isDownSm ? "body2" : "body1"}>10</Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={2} direction={"row"} alignItems={"center"}>
                            <EventIcon sx={{ transform: !isDownSm && "scale(1.5)" }} color={"primary"}/>
                            <Box>
                                <Typography variant={"caption"} color={"primary"}>Created at</Typography>
                                <Typography variant={isDownSm ? "body2" : "body1"}>07.08.2022 14:00</Typography>
                            </Box>
                        </Stack>
                    </Stack>
                    <Typography variant={"body2"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cum deserunt dignissimos fugit hic impedit possimus repellat repellendus sint, voluptates! Harum minima perspiciatis quod temporibus veniam. Aspernatur iusto rem tempore!
                </Typography>
            </Stack>
            </CardContent>
        </Card>
    )
}

export default CollectionSingleCard