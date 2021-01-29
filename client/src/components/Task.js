import React, { useState, useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

const Task = ({ task }) => {
  const { removeTask, findTask, toggleTask } = useContext(TaskContext);
  const [show, setShow] = useState(false);

  //Handle Delete Function
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/v1/tasks/${id}`, {
        method: "DELETE",
      });
      removeTask(id);
    } catch (err) {
      console.error(err.message);
    }
  };

  //The Toggle Function
  const handleToggle = async (id) => {
    toggleTask(id);
  };

  return (
    <div>
      <li className="list-task font-med">
        <div className="task-1">
          <input
            className="checkbox"
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggle(task.id)}
          />
          <div
            style={{ cursor: "pointer" }}
            className={task.completed ? "task-complete" : "tasks-title"}
            onClick={() => setShow(!show)}
          >
            {task.title}
          </div>
        </div>
        <div className="task-2">
          <button className="btn btn-edit " onClick={() => findTask(task.id)}>
            <i className="fas fa-pen"></i>
          </button>
          <button
            className="btn btn-delete"
            onClick={() => handleDelete(task.id)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </li>
      <ul className="details font-sml">
        <li className={show ? "tasks-details" : "hide-details"}>
          <i className="fa fa-arrow-right arrow"></i>
          <span>{task.details}</span>
        </li>
      </ul>
    </div>
  );
};

export default Task;
