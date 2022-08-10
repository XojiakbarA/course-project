import {Avatar, Grid, Stack, useMediaQuery} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CommentIcon from '@mui/icons-material/Comment';
import ItemSingleCard from "../../components/cards/ItemSingleCard";
import PageTitle from "../../components/commons/PageTitle";
import CommentCard from "../../components/cards/CommentCard";
import CommentForm from "../../components/forms/CommentForm";

const ItemsID = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={7} lg={8} order={{ xs: 2 }}>
                <ItemSingleCard/>
            </Grid>
            <Grid item xs={12} md={5} lg={4} order={{ xs: 1 }}>
                <Avatar
                    variant={"rounded"}
                    sx={{ width: "100%", minHeight: 250 }}
                >
                    <ImageIcon sx={{ transform: "scale(3)" }}/>
                </Avatar>
            </Grid>
            <Grid item xs={12} md={7} lg={8} display={"flex"} justifyContent={"center"} order={{ xs: 3 }}>
                <PageTitle
                    text={"Comments"}
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<CommentIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid xs={0} md={5} item lg={4} order={{ xs: 4 }}/>
            <Grid item xs={12} md={7} lg={8} order={{ xs: 5 }}>
                <Stack
                    spacing={2}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"start"}
                >
                    <CommentCard/>
                    <CommentCard right/>
                    <CommentCard/>
                    <CommentCard/>
                    <CommentCard right/>
                    <CommentCard/>
                </Stack>
            </Grid>
            <Grid item xs={12} md={5} lg={4} order={{ xs: 6 }}>
                <CommentForm/>
            </Grid>
        </Grid>
    )
}

export default ItemsID