import {Navigate, Outlet} from "react-router";
import {useSelector} from "react-redux";
import {authSelector} from "../store/selectors";
import {isExpired} from "react-jwt";

const Protected = () => {

    const { token } = useSelector(authSelector)

    if (isExpired(token)) {
        return <Navigate to="/"/>
    }

    return <Outlet/>
}

export default Protected