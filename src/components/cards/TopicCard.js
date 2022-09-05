import {Card, CardContent, IconButton, Stack, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TopicIcon from '@mui/icons-material/Topic';
import {useDispatch} from "react-redux";
import {toggleDeleteTopic, toggleEditTopic} from "../../store/slices/dialogsSlice";
import {setTopic} from "../../store/slices/topicsSlice";
import {useTranslation} from "react-i18next";

const TopicCard = ({ topic }) => {

    const dispatch = useDispatch()
    const { t } = useTranslation()

    const toggleTopicEditDialog = () => {
        dispatch(setTopic(topic))
        dispatch(toggleEditTopic())
    }
    const toggleTopicDeleteDialog = () => {
        dispatch(setTopic(topic))
        dispatch(toggleDeleteTopic())
    }

    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Stack>
                        <Stack direction={"row"} spacing={1} alignItems={"center"}>
                            <TopicIcon/>
                            <Typography variant={"h6"}>{ topic?.name }</Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={1} alignItems={"center"}>
                            <Typography variant={"body2"}>{ t("createdAt") }:</Typography>
                            <Typography variant={"body2"}>{ new Date(topic?.createdAt).toLocaleString() }</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} justifyContent={"end"}>
                        <IconButton onClick={toggleTopicEditDialog}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={toggleTopicDeleteDialog}>
                            <DeleteIcon/>
                        </IconButton>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default TopicCard