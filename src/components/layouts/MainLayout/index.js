import {Outlet} from "react-router";
import MyAppBar from "./MyAppBar";

const MainLayout = () => {

    return (
        <>
        <MyAppBar/>
        <Outlet/>
        </>
    )
}

export default MainLayout