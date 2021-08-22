import axios from 'axios'

export const getTasks = async (page) => {
    try {
        const { data } = await axios.get(`/api/tasks?page=${page}`)
        return { ...data }
    } catch (error) {
        console.error(error)
    }
}

export const createTask = async (task) => {
    try {
        const { data: newTask } = await axios.post('/api/tasks', task)
        return { newTask }
    } catch ({ response: { data: { errors } } }) {
        return { errors }
    }
}

export const updateTask = async (task) => {
    try {
        const { data: updatedTask } = await axios.patch("completed" in task ? `/api/tasks/${task.taskId}/status` : `/api/tasks/${task.taskId}`, task)
        return { updatedTask }
    } catch ({ response: { data: { errors } } }) {
        return { errors }
    }
}

export const deleteTask = async (taskId) => {
    try {
        const deletedTask = await axios.delete(`/api/tasks/${taskId}`)
        return deletedTask;
    } catch (error) {
        console.error(error)
    }
}