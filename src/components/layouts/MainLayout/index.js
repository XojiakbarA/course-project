import {Outlet} from "react-router";
import MainAppBar from "./MainAppBar";
import {Container, Toolbar} from "@mui/material";
import MainDrawer from "./MainDrawer";
import {useState} from "react";

const MainLayout = () => {

    const [drawer, setDrawer] = useState(false)

    const toggleDrawer = () => setDrawer(prev => !prev)

    return (
        <>
        <MainAppBar onMenuClick={toggleDrawer}/>
        <MainDrawer open={drawer} onClose={toggleDrawer}/>
        <Toolbar/>
        <Container maxWidth={"xl"} sx={{ mt: 2 }}>
            <Outlet/>
        </Container>
        <Toolbar/>
        </>
    )
}

export default MainLayout