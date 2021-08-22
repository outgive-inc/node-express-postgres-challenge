import axios from 'axios'

export const createSubTask = async (subTask) => {
    try {
        const { data: newSubTask } = await axios.post('/api/sub-tasks', subTask)
        return { newSubTask }
    } catch ({ response: { data: { errors } } }) {
        return { errors }
    }
}

export const updateSubTask = async (subTask) => {
    try {
        const { data: updatedSubTask } = await axios.patch("completed" in subTask ? `/api/sub-tasks/${subTask.subTaskId}/status` : `/api/sub-tasks/${subTask.subTaskId}`, subTask)
        return { updatedSubTask }
    } catch ({ response: { data: { errors } } }) {
        return { errors }
    }
}

export const deleteSubTask = async (subTaskId) => {
    try {
        const deletedSubTask = await axios.delete(`/api/sub-tasks/${subTaskId}`)
        return deletedSubTask;
    } catch (error) {
        console.error(error)
    }
}