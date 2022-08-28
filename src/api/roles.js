import {instance} from "./auth";

export const fetchRoles = async () => {
    return await instance.get("/api/roles")
}