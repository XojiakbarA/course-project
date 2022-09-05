import {useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setSnackbar} from "../store/slices/snackbarSlice";
import {oAuth2Login} from "../store/slices/authSlice";

const OAuth2RedirectHandler = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const token = params.get("token")
    const error = params.get("error")

    const message = params.get("message")

    useEffect(() => {
        if (token) {
            dispatch(oAuth2Login({ token }))
            dispatch(setSnackbar({ data: message, open: true, color: "success" }))
        }
        if (error) {
            dispatch(setSnackbar({ data: error, open: true, color: "error" }))
        }
        navigate("/")
    }, [token, error, message, navigate, dispatch])
}

export default OAuth2RedirectHandler