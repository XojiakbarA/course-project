import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {fetchSearchItems} from "../api/items";
import {Grid, useMediaQuery} from "@mui/material";
import PageTitle from "../components/commons/PageTitle";
import SearchIcon from '@mui/icons-material/Search';
import ItemListCard from "../components/cards/ItemListCard";
import ItemListSkeleton from "../components/skeletons/ItemListSkeleton";
import {useTranslation} from "react-i18next";

const Search = () => {

    const { t } = useTranslation()
    const params = useParams()

    const skeletonSize = Array.from({length: 12}, (_, i) => i)

    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        const getSearchItems = async () => {
            setLoading(true)
            const res = await fetchSearchItems(params.key)
            if (res.status === 200) {
                setItems(res.data.data)
                setLoading(false)
            }

        }
        getSearchItems()
    },[params.key])

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    text={ t("search") }
                    variant={isDownSm ? "h5" : "h4"}
                    color={"primary"}
                    icon={<SearchIcon sx={{ transform: isDownSm ? "scale(1.2)" : "scale(1.5)" }} color={"primary"}/>}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {
                        items.map(item => (
                            <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                                <ItemListCard item={item}/>
                            </Grid>
                        ))
                    }
                    {
                        loading
                        &&
                        skeletonSize.map(skeleton => (
                            <Grid key={skeleton} item xs={12} md={6} lg={3}>
                                <ItemListSkeleton/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Search