import {Card, CardContent, IconButton, Skeleton, Stack, Typography} from "@mui/material";
import TopicIcon from '@mui/icons-material/Topic';
import {useTranslation} from "react-i18next";

const TopicSkeleton = () => {

    const { t } = useTranslation()

    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Stack>
                        <Stack direction={"row"} spacing={1} alignItems={"center"}>
                            <TopicIcon/>
                            <Typography variant={"h6"}><Skeleton width={200}/></Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={1} alignItems={"center"}>
                            <Typography variant={"body2"}>{ t("createdAt") }:</Typography>
                            <Typography variant={"body2"}><Skeleton width={150}/></Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} justifyContent={"end"}>
                        <IconButton disabled>
                            <Skeleton variant={"circular"} width={24} height={24}/>
                        </IconButton>
                        <IconButton disabled>
                            <Skeleton variant={"circular"} width={24} height={24}/>
                        </IconButton>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default TopicSkeleton