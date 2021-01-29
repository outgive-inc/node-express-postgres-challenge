import React, { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

const Nav = () => {
  const { tasks } = useContext(TaskContext);
  return (
    <div className="nav">
      <h2 className="font-big">Task List</h2>
      <p className="font-sml">
        No. of task remaining:{" "}
        {tasks.length - tasks.filter((task) => task.completed).length}
      </p>
    </div>
  );
};

export default Nav;
