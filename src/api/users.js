import {instance} from "./auth";

export const updateUser = async (id, data) => {
    return await instance.put(`/api/users/${id}`, data)
}

export const updateUserImage = async (userId, imageId, data) => {
    return await instance.put(`/api/users/${userId}/images/${imageId}`, data)
}

export const destroyUserImage = async (userId, imageId) => {
    return await instance.delete(`/api/users/${userId}/images/${imageId}`)
}