import {instance} from "./auth";

export const fetchTopics = async (params) => {
    return await instance.get("/api/topics", { params })
}

export const storeTopic = async (data) => {
    return await instance.post("/api/topics", data)
}

export const updateTopic = async (id, data) => {
    return await instance.put(`/api/topics/${id}`, data)
}

export const destroyTopic = async (id) => {
    return await instance.delete(`/api/topics/${id}`)
}