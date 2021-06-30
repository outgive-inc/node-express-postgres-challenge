import React, { useContext, useEffect, useState } from "react";
import { apiUrl } from "../config.json";
import EditTask from "./editTask";
import ViewTask from "./viewTask";
import { Context } from "../store/taskStore";
import { getAllTask } from "../services/taskService";

const ListTasks = () => {
    const [state, dispatch] = useContext(Context);
    const [showByStatus, setShowStatus] = useState(false);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const taskData = await getAllTask();
                console.log(taskData);
                if (taskData) {
                    dispatch({ type: "SET_TASK_LIST", payload: taskData });
                    console.log(taskData);
                }
            } catch (err) {
                console.error(err.message);
            }
        };
        getTasks();
    }, [dispatch]);

    const toggleShowStatus = () => {
        setShowStatus(!showByStatus);
    };

    const deleteTask = async (id) => {
        try {
            const res = await fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
            });

            const unDeletedTasks = state.taskList.filter(
                (task) => task.id !== id
            );

            dispatch({
                type: "SET_TASK_LIST",
                payload: unDeletedTasks,
            });
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div>
            <button className="btn btn-primary mt-5" onClick={toggleShowStatus}>
                {showByStatus ? (
                    <div>Show Uncompleted Task</div>
                ) : (
                    <div>Show Completed Task</div>
                )}
            </button>

            <table className="table mt-1 text-center">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {showByStatus
                        ? state.taskList
                              .filter((task) => task.completed)
                              .map((task) => (
                                  <tr key={task.id}>
                                      <td>
                                          <ViewTask taskData={task} />
                                      </td>
                                      <td>
                                          <EditTask taskData={task} />
                                      </td>
                                      <td>
                                          <button
                                              className="btn btn-danger"
                                              onClick={() => {
                                                  deleteTask(task.id);
                                              }}
                                          >
                                              x
                                          </button>
                                      </td>
                                  </tr>
                              ))
                        : state.taskList
                              .filter((task) => !task.completed)
                              .map((task) => (
                                  <tr key={task.id}>
                                      <td>
                                          <ViewTask taskData={task} />
                                      </td>
                                      <td>
                                          <EditTask taskData={task} />
                                      </td>
                                      <td>
                                          <button
                                              className="btn btn-danger"
                                              onClick={() => {
                                                  deleteTask(task.id);
                                              }}
                                          >
                                              x
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListTasks;
