import { useContext, useEffect, useState } from 'react'
import { TaskAdapter, SubTaskAdapter } from '../../../adapters'
import { TaskListContext } from '../../../pages'

export const CreateTaskBL = () => {
    const { createModalOpen, setCreateModalOpen, setHasTaskEvent, subTaskTaskId, setSubTaskTaskId } = useContext(TaskListContext)

    const [createBtnDisabled, setCreateBtnDisabled] = useState(false)
    const [title, setTitle] = useState()
    const [details, setDetails] = useState()
    const [errors, setErrors] = useState({})

    const createTask = async (e) => {
        setCreateBtnDisabled(!createBtnDisabled)
        const { errors } = !subTaskTaskId 
            ? await TaskAdapter.createTask({title, details})
            : await SubTaskAdapter.createSubTask({taskId: subTaskTaskId, title})

        if (errors) return showErrors(errors)

        setHasTaskEvent(true)
        closeCreateTaskModal();
    }

    const showErrors = (errors) => {
        setErrors(errors)
        setCreateBtnDisabled(false)
    }

    const closeCreateTaskModal = () => {
        setTitle()
        setDetails()
        setErrors({})
        setCreateBtnDisabled(false)
        setCreateModalOpen(false)
        setSubTaskTaskId()
    }

    return {
        subTaskTaskId,
        createTask,

        // Form Inputs
        title, 
        setTitle,
        details, 
        setDetails,
        createBtnDisabled,

        // Form Errors
        errors,
        setErrors,
        
        // Modal
        createModalOpen, 
        closeCreateTaskModal
    }
}
