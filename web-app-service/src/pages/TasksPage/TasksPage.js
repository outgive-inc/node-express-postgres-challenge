import { createContext } from "react"
import { TaskHeader, TaskList, CreateTaskModal, UpdateTaskModal, DeleteTaskModal } from "../../components"
import { TasksPageBL } from "./TaskPageBL";

export const TaskListContext = createContext();

export const TasksPage = () => {
    const { taskListContextObject } = TasksPageBL()

    return (
        <TaskListContext.Provider value={{...taskListContextObject}}>
            <TaskHeader />
            <TaskList />
            <CreateTaskModal />
            <UpdateTaskModal />
            <DeleteTaskModal />
        </TaskListContext.Provider>
    )
}
