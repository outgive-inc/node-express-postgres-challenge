import { useContext, useEffect, useRef, useState } from 'react'
import { SubTaskAdapter, TaskAdapter } from '../../../adapters'
import { TaskListContext } from '../../../pages'

export const DeleteTaskBL = () => {
    const { 
        deleteModalOpen, 
        setDeleteModalOpen, 
        deleteTaskId, 
        setDeleteTaskId, 
        deleteSubTask,
        setDeleteSubTask,
        setHasTaskEvent 
    } = useContext(TaskListContext)
    const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(false)

    const taskIdRef = useRef()

    const deleteTask = async (e) => {
        setDeleteBtnDisabled(!deleteBtnDisabled)
        const res = !deleteSubTask
            ? await TaskAdapter.deleteTask(deleteTaskId)
            : await SubTaskAdapter.deleteSubTask(deleteTaskId)
            
        setHasTaskEvent(true)
        setDeleteSubTask(!deleteSubTask)
        closeDeleteTaskModal();
    }

    const closeDeleteTaskModal = () => {
        setDeleteTaskId()
        setDeleteBtnDisabled(false)
        setDeleteModalOpen(false)
    }

    useEffect(() => {
        
    }, [])

    return {
        deleteTaskId,
        deleteTask,
        deleteSubTask,

        // Form Inputs
        taskIdRef,
        deleteBtnDisabled,
        
        // Modal
        deleteModalOpen, 
        closeDeleteTaskModal
    }
}
