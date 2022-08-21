import {instance} from "./auth";

export const fetchTags = async () => {
    return await instance.get("/api/tags")
}