import axios from "axios"
import {API_BASE_URL} from "../utils/constants";

export const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

instance.interceptors.request.use(async req => {
    const token = localStorage.getItem("token")
    const lang = localStorage.getItem("i18nextLng")
    if (token) req.headers["Authorization"] = "Bearer " + token
    if (lang) req.headers["Accept-Language"] = lang
    return req
})

export const authGetUser = async () => await instance.get("/auth/me")

export const authLogin = async (data) => await instance.post("/auth/login", data)

export const fetchCustomFieldTypes = async () => await instance.get("/api/custom-field-types")