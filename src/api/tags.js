import {instance} from "./auth";

export const fetchTags = async () => {
    return await instance.get("/api/tags")
}

export const fetchTagItems = async (id, params) => {
    return await instance.get(`/api/tags/${id}/items`, { params })
}

export const fetchTag = async (id) => {
    return await instance.get(`/api/tags/${id}`)
}