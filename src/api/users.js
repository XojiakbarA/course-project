import {instance} from "./auth";

export const updateUser = async (id, data) => {
    return instance.put(`/api/users/${id}`, data)
}