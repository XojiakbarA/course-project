import {Navigate, Outlet} from "react-router";
import {useSelector} from "react-redux";
import {authSelector} from "../store/selectors";

const Protected = () => {

    const { isAuth } = useSelector(authSelector)

    if (!isAuth) return <Navigate to="/"/>

    return <Outlet/>
}

export default Protected