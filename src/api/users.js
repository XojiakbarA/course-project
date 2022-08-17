import {instance} from "./auth";

export const updateUser = async (id, data) => {
    return await instance.put(`/api/users/${id}`, data)
}

export const updateUserImage = async (userId, data) => {
    return await instance.put(`/api/users/${userId}/images`, data)
}

export const destroyUserImage = async (userId) => {
    return await instance.delete(`/api/users/${userId}/images`)
}

export const fetchUserCollections = async (id) => {
    return await instance.get(`/api/users/${id}/collections`)
}