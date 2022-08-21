import {instance} from "./auth";

export const fetchCollection = async (id) => {
    return await instance.get(`/api/collections/${id}`)
}

export const storeCollection = async (data) => {
    return await instance.post("/api/collections", data)
}

export const updateCollection = async (id, data) => {
    return await instance.put(`/api/collections/${id}`, data)
}

export const destroyCollection = async (id) => {
    return await instance.delete(`/api/collections/${id}`)
}

export const destroyCollectionImage = async (id) => {
    return await instance.delete(`/api/collections/${id}/images`)
}

export const fetchCollectionItems = async (id) => {
    return await instance.get(`/api/collections/${id}/items`)
}