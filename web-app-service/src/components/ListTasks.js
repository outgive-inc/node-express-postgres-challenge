import React, { Fragment, useEffect, useState } from "react";

//modals
import ViewDetails from "./ViewDetails";
import TaskCompleted from "./TaskCompleted";
import DeleteTasks from "./DeleteTask";

const ListTasks = () => {

    const [tasks, setTasks] = useState([]);

    //get all tasks 
    const getTasks = async () => {
        try {

            const response = await fetch("http://localhost:5000/api/tasks/getAll/")
            const jsonData = await response.json();

            setTasks(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <Fragment>
            <table className="table table-borderless mt-5">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Completed?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.taskId}>
                            <td>{task.title}</td>
                            <td>
                                <TaskCompleted
                                    key={task.taskId}
                                    task={task}
                                />
                            </td>
                            <td>
                                <div class="btn-toolbar">
                                    <ViewDetails task={task} />
                                    <DeleteTasks task={task} />
                                </div>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTasks;