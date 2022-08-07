import {Avatar, Card, CardContent, CardHeader, Rating, Typography, useMediaQuery} from "@mui/material";

const CommentCard = ({ right }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Card sx={{
            maxWidth: isDownSm ? "90%" : "60%",
            minWidth: "60%",
            alignSelf: right ? "end" : "start"
        }}>
            <CardHeader
                avatar={<Avatar/>}
                title={"Xojiakbar"}
                subheader={"08.08.2022 12:44"}
                action={<Rating size={isDownSm ? "small" : "medium"} readOnly value={4}/>}
            />
            <CardContent>
                <Typography variant={"body2"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi atque autem cupiditate error in modi quam saepe. Consectetur consequuntur expedita in ipsam, natus nisi, optio pariatur ratione, sed similique totam.
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CommentCard