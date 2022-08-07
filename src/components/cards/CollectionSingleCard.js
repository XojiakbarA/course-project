import {
    Avatar,
    Box,
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
import AttachmentIcon from "@mui/icons-material/Attachment";
import EventIcon from "@mui/icons-material/Event";

const CollectionSingleCard = ({ onEditClick, onDeleteClick }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Card sx={{ minHeight: "100%" }}>
            <CardContent>
                <Stack spacing={4}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack direction={"row"} spacing={1} alignItems={"end"} >
                            <Typography variant={isDownSm ? "h5" : "h4"}>Collection 1</Typography>
                            <Typography variant={isDownSm ? "body1" : "h6"} color={"text.disabled"}>Topic 1</Typography>
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
                        divider={<Divider orientation={"vertical"}flexItem/>}
                    >
                        <Stack spacing={2} direction={"row"} alignItems={"center"}>
                            <Avatar sx={{ width: 40, height: 40 }}/>
                            <Box>
                                <Typography variant={"caption"} color={"primary"}>User</Typography>
                                <Typography>Xojiakbar</Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={2} direction={"row"} alignItems={"center"}>
                            <AttachmentIcon sx={{ transform: "scale(1.5)" }} color={"primary"}/>
                            <Box>
                                <Typography variant={"caption"} color={"primary"}>Items</Typography>
                                <Typography>10</Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={2} direction={"row"} alignItems={"center"}>
                            <EventIcon sx={{ transform: "scale(1.5)" }} color={"primary"}/>
                            <Box>
                                <Typography variant={"caption"} color={"primary"}>Created at</Typography>
                                <Typography>07.08.2022 14:00</Typography>
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