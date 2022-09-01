import {instance} from "./auth";

export const fetchComments = async (params) => {
    return await instance.get("/api/comments", { params })
}

export const storeComment = async (data) => {
    return await instance.post("/api/comments", data)
}

export const updateComment = async (id, data) => {
    return await instance.put(`/api/comments/${id}`, data)
}

export const destroyComment = async (id) => {
    return await instance.delete(`/api/comments/${id}`)
}