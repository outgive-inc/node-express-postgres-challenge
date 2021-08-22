import { useContext, useEffect, useState } from 'react'
import { SubTaskAdapter, TaskAdapter } from '../../../adapters'
import { TaskListContext } from '../../../pages'

export const TaskListItemBL = ({ task }) => {
    const { 
        createTaskModalOpen,
        setCreateModalOpen,

        updateModalOpen,
        setUpdateModalOpen,

        deleteModalOpen, 
        setDeleteModalOpen, 

        setDeleteTaskId,
        setDeleteSubTask,
        setUpdateTaskData,

        setSubTaskTaskId,
        hasTaskEvent,
        setHasTaskEvent
    } = useContext(TaskListContext)

    const [subTasks, setSubTasks] = useState([])
    const [isCollapsed, setIsCollapsed] = useState(true)

    const initDeleteModal = ({ id, isSubTask }) => {
        setDeleteModalOpen(!deleteModalOpen)
        setDeleteTaskId(id)
        setDeleteSubTask(isSubTask)
    }

    const initUpdateModal = ({ taskId, title, details }) => {
        setUpdateTaskData({ taskId, title, details })
        setUpdateModalOpen(!updateModalOpen)
    }

    const initCreateModal = ({ taskId }) => {
        setSubTaskTaskId(taskId)
        setCreateModalOpen(!createTaskModalOpen)
    }

    const updateTaskStatus = async ({ id, completed, isSubTask = false }) => {
        const res = !isSubTask 
            ? await TaskAdapter.updateTask({taskId: id, completed, isSubTask})
            : await SubTaskAdapter.updateSubTask({subTaskId: id, completed, isSubTask})
        setHasTaskEvent(true)
    }

    useEffect(() => {
        setSubTasks(task.SubTasks)
    }, [hasTaskEvent])

    return {
        subTasks,
        isCollapsed,
        setIsCollapsed,
        initUpdateModal,
        initDeleteModal,
        initCreateModal,
        updateTaskStatus
    }
}
