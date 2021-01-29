import React, { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import Task from "./Task";

const TaskList = () => {
  const { tasks } = useContext(TaskContext);
  return (
    <div>
      {tasks.length ? (
        <ul className="list">
          {tasks.map((task, i) => (
            <Task key={i} task={task} />
          ))}
        </ul>
      ) : (
        <div className="no-tasks font-med">No Tasks</div>
      )}
    </div>
  );
};

export default TaskList;
