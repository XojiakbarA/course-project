import {Card, CardContent, CardHeader, Rating, Typography, useMediaQuery} from "@mui/material";
import {useSelector} from "react-redux";
import {authSelector} from "../../store/selectors";
import AvatarImage from "../images/AvatarImage";

const CommentCard = ({ comment }) => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const { user } = useSelector(authSelector)

    const right = user?.id === comment?.user?.id

    return (
        <Card sx={{
            maxWidth: isDownSm ? "90%" : "60%",
            minWidth: "60%",
            alignSelf: right ? "end" : "start"
        }}>
            <CardHeader
                avatar={<AvatarImage publicId={comment?.user?.image?.value} size={35}/>}
                title={ comment?.user?.firstName }
                subheader={ new Date(comment?.createdAt).toLocaleString() }
                action={<Rating size={"small"} readOnly value={comment?.rating}/>}
                subheaderTypographyProps={{ variant: "caption" }}
            />
            <CardContent>
                <Typography variant={"body2"}>
                    { comment?.text }
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CommentCard