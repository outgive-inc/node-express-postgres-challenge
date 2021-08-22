import { useContext, useEffect, useRef, useState } from 'react'
import { TaskAdapter } from '../../../adapters'
import { TaskListContext } from '../../../pages'

export const UpdateTaskBL = () => {
    const { 
        updateModalOpen, 
        setUpdateModalOpen,
        updateTaskData,
        setHasTaskEvent 
    } = useContext(TaskListContext)

    const [updateBtnDisabled, setUpdateBtnDisabled] = useState(false)
    const [title, setTitle] = useState()
    const [details, setDetails] = useState()
    const [errors, setErrors] = useState()

    const updateTask = async (e) => {
        setUpdateBtnDisabled(!updateBtnDisabled)
        await TaskAdapter.updateTask({
            taskId: updateTaskData.taskId,
            title,
            details
        })
        setHasTaskEvent(true)
        closeCreateTaskModal();
    }

    const closeCreateTaskModal = () => {
        setTitle()
        setDetails()
        setErrors({})
        setUpdateBtnDisabled(false)
        setUpdateModalOpen(false)
    }

    useEffect(() => {
        if (updateTaskData) {
            setTitle(updateTaskData.title)
            setDetails(updateTaskData.details)
        }
    }, [updateTaskData])

    return {
        updateTask,

        // Form Inputs
        title,
        details,
        setTitle,
        setDetails,
        updateBtnDisabled,

        // Form Errors
        errors,
        setErrors,
        
        // Modal
        updateModalOpen,
        setUpdateModalOpen, 
        closeCreateTaskModal
    }
}
