import {Navigate, Outlet} from "react-router";
import {useSelector} from "react-redux";
import {authSelector} from "../store/selectors";

const Protected = () => {

    const { user } = useSelector(authSelector)

    if (!user) {
        return <Navigate to="/"/>
    }

    return <Outlet/>
}

export default Protected