import { useState } from "react"

export const TasksPageBL = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [hasTaskEvent, setHasTaskEvent] = useState(false)
    
    const [updateTaskData, setUpdateTaskData] = useState()
    const [deleteSubTask, setDeleteSubTask] = useState(false)
    const [deleteTaskId, setDeleteTaskId] = useState()
    
    const [subTaskTaskId, setSubTaskTaskId] = useState()

    const taskListContextObject = {
        createModalOpen, setCreateModalOpen, 
        updateModalOpen, setUpdateModalOpen,
        deleteModalOpen, setDeleteModalOpen,

        updateTaskData, setUpdateTaskData,
        
        deleteSubTask, setDeleteSubTask,
        deleteTaskId, setDeleteTaskId,
        
        subTaskTaskId, setSubTaskTaskId,
        
        hasTaskEvent, setHasTaskEvent,
    }

    return { taskListContextObject }
}
