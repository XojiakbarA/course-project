import {Card, CardContent, IconButton, Stack, Typography} from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {toggleDeleteTag, toggleEditTag} from "../../store/slices/dialogsSlice";
import {setTag} from "../../store/slices/tagsSlice";

const TagCard = ({ tag }) => {

    const dispatch = useDispatch()

    const toggleTagEditDialog = () => {
        dispatch(setTag(tag))
        dispatch(toggleEditTag())
    }
    const toggleTagDeleteDialog = () => {
        dispatch(setTag(tag))
        dispatch(toggleDeleteTag())
    }

    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Stack>
                        <Stack direction={"row"} spacing={1} alignItems={"center"}>
                            <TagIcon/>
                            <Typography variant={"h6"}>{ tag?.name }</Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={1} alignItems={"center"}>
                            <Typography variant={"body2"}>Created At:</Typography>
                            <Typography variant={"body2"}>{ new Date(tag?.createdAt).toLocaleString() }</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} justifyContent={"end"}>
                        <IconButton onClick={toggleTagEditDialog}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={toggleTagDeleteDialog}>
                            <DeleteIcon/>
                        </IconButton>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default TagCard