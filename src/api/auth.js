import axios from "axios"
import {API_BASE_URL} from "../utils/constants";

export const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

instance.interceptors.request.use(async req => {
    const token = localStorage.getItem("token")
    if (token) req.headers.Authorization = "Bearer " + token
    return req
})

export const authGetUser = async () => await instance.get("me")

export const authLogin = async (data) => await instance.post("login", data)

export const authRegister = async (data) => await instance.post("register", data)