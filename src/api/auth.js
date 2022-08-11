import axios from "axios"

export const baseURL = "http://localhost:8080/api/"

export const instance = axios.create({
    baseURL,
    withCredentials: true
})

instance.interceptors.request.use(async req => {
    const token = localStorage.getItem("token")
    if (token) req.headers.Authorization = "Bearer " + token
    return req
})

export const authLogin = async (data) => await instance.post("login", data)

export const authRegister = async (data) => await instance.post("register", data)