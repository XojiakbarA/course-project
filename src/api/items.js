import {instance} from "./auth";

export const fetchItems = async (params) => {
    return await instance.get("/api/items", { params })
}

export const storeItem = async (data) => {
    return await instance.post("/api/items", data)
}

export const updateItem = async (id, data) => {
    return await instance.put(`/api/items/${id}`, data)
}

export const destroyItem = async (id) => {
    return await instance.delete(`/api/items/${id}`)
}

export const destroyItemImage = async (id) => {
    return await instance.delete(`/api/items/${id}/images`)
}