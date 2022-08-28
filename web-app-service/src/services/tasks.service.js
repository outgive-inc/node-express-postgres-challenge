import { apiEndPoint } from "../utils/constants"
import { GET, POST, DELETE, PUT } from "./api.service.wrapper"

export const GetTasks = async (args) => {
    return await GET(apiEndPoint.tasks, args)
}

export const AddTask = async (payload) => {
    return await POST(apiEndPoint.tasks, payload)
}

export const DeleteTask = async (id) => {
    return await DELETE(apiEndPoint.tasks, id)
}

export const UpdateTask = async (id, payload) => {
    return await PUT(apiEndPoint.tasks, id, payload)
}