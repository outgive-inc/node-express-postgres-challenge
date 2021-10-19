import React, { Fragment, useEffect, useState } from "react";
import SubTaskCompleted from "./SubTaskCompleted";

const ListSubTasks = ({ task }) => {

    const [subTasks, setSubTasks] = useState([]);

    //delete a subtask
    const deleteSubTask = async (subTask) => {
        try {
            await fetch(`http://localhost:5000/api/subtasks/delete/${subTask.subTaskId}`, {
                method: "DELETE",
            });

            setSubTasks(subTasks.filter((subTask) => subTask.subTaskId !== subTasks));

        } catch (err) {
            console.error(err.message);
        }
    };

    //get all subtasks 

    const getSubTasks = async () => {
        try {

            const response = await fetch(`http://localhost:5000/api/subtasks/getAll/${task.taskId}`)
            const jsonData = await response.json();

            setSubTasks(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getSubTasks();
    });

    useEffect(() => {
        deleteSubTask();
    });

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
                    {subTasks.map(subTask => (
                        <tr key={subTask.subTaskId}>
                            <td>{subTask.title}</td>
                            <td>
                                <SubTaskCompleted subTask={subTask}/>
                            </td>
                            <td>

                                <button className="btn btn-danger"
                                    onClick={() => deleteSubTask(subTask)}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Delete Sub-Task">
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListSubTasks;