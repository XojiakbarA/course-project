import {instance} from "./auth";

export const fetchTags = async (params) => {
    return await instance.get("/api/tags", { params })
}

export const fetchTagItems = async (id, params) => {
    return await instance.get(`/api/tags/${id}/items`, { params })
}

export const fetchTag = async (id) => {
    return await instance.get(`/api/tags/${id}`)
}

export const storeTag = async (data) => {
    return await instance.post("/api/tags", data)
}

export const updateTag = async (id, data) => {
    return await instance.put(`/api/tags/${id}`, data)
}

export const destroyTag = async (id) => {
    return await instance.delete(`/api/tags/${id}`)
}