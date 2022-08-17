import {instance} from "./auth";

export const fetchTopics = async () => {
    return await instance.get("/api/topics")
}