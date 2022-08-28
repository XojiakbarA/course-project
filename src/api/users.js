import {instance} from "./auth";

export const fetchUsers = async (params) => {
    return await instance.get(`/api/users`, { params })
}

export const storeUser = async (data) => {
    return await instance.post(`/api/users`, data)
}

export const updateUser = async (id, data) => {
    return await instance.put(`/api/users/${id}`, data)
}

export const destroyUser = async (id) => {
    return await instance.delete(`/api/users/${id}`)
}

export const destroyUserImage = async (id) => {
    return await instance.delete(`/api/users/${id}/images`)
}

export const fetchUserCollections = async (id, params) => {
    return await instance.get(`/api/users/${id}/collections`, { params })
}