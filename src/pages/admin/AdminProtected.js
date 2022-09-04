import {Navigate, Outlet} from "react-router";
import {useSelector} from "react-redux";
import {authSelector} from "../../store/selectors";

const AdminProtected = () => {

    const { isAdmin } = useSelector(authSelector)

    if (!isAdmin) return <Navigate to="/"/>

    return <Outlet/>
}

export default AdminProtected