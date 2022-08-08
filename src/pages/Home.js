import {Box, Chip, Grid, Link, Stack, useMediaQuery} from "@mui/material";
import {Link as RouterLink} from "react-router-dom"
import PageTitle from "../components/commons/PageTitle";
import CategoryIcon from "@mui/icons-material/Category";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TagIcon from '@mui/icons-material/Tag';
import ItemListCard from "../components/cards/ItemListCard";
import CollectionListCard from "../components/cards/CollectionListCard";

const items = [1, 2, 3, 4, 5, 6, 7, 8]
const collections = [1, 2, 3, 4, 5]
const tags = [1, 2, 3, 4, 5, 6, 7, 8]

const Home = () => {

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                    <PageTitle
                        text={"Last Items"}
                        variant={isDownSm ? "h5" : "h4"}
                        color={"primary"}
                        icon={<AttachFileIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                    />
                    <Link component={RouterLink} to={"/items"}>View All</Link>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                {
                    items.map(item => (
                        <Grid key={item} item xs={12} sm={6} md={4} lg={3}>
                            <ItemListCard key={item}/>
                        </Grid>
                    ))
                }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"end"}>
                    <PageTitle
                        text={"The Biggest Collections"}
                        variant={isDownSm ? "h5" : "h4"}
                        color={"primary"}
                        icon={<CategoryIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                    />
                    <Link component={RouterLink} to={"/collections"}>View All</Link>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {
                        collections.map(collection => (
                            <Grid key={collection} item xs={12} sm={6} md={4} lg={3}>
                                <CollectionListCard key={collection}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <PageTitle
                    text={"Tags"}
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<TagIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid item xs={12}>
                <Box>
                    {
                        tags.map(tag => (
                            <Chip
                                sx={{ mb: 2, mr: 2 }}
                                key={tag}
                                clickable
                                label={"#smartphones"}
                                component={RouterLink}
                                to={"/tags/1"}
                            />
                        ))
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

export default Home