import {Outlet} from "react-router";
import MyAppBar from "./MyAppBar";
import {Container, Toolbar} from "@mui/material";

const MainLayout = () => {

    return (
        <>
        <MyAppBar/>
        <Toolbar/>
        <Container maxWidth={"xl"} sx={{ mt: 2 }}>
            <Outlet/>
        </Container>
        <Toolbar/>
        </>
    )
}

export default MainLayout