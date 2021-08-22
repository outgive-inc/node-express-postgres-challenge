import { useContext, useEffect, useState } from "react"
import { TaskAdapter } from "../../../adapters"
import { TaskListContext } from "../../../pages"

export const TaskListBL = () => {
    const {hasTaskEvent, setHasTaskEvent} = useContext(TaskListContext)
    const [firstLoad, setFirstLoad] = useState(true)
    const [tasks, setTasks] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)

    const fetchTasks = async () => {
        if (hasTaskEvent) return setHasTaskEvent(false)
    
        const { tasks, page: currentPage, totalPage } = await TaskAdapter.getTasks(page)
        
        setTasks(tasks)
        setPage(currentPage)
        setTotalPage(totalPage)

        if (firstLoad) return setFirstLoad(!firstLoad)
    }

    const handlePageClick = ({ selected }) => {
        setPage(selected + 1)
    }

    useEffect(() => {
        fetchTasks()
    }, [hasTaskEvent, page])    

    return {
        tasks,
        page,
        totalPage,
        handlePageClick
    }
}
