import React, { useState, createContext } from "react";

export const TasksContext = createContext();

export const TasksContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const addTasks = (task) => {
    setTasks([...tasks, task]);
  };
  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        addTasks,
        selectedTask,
        setSelectedTask,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};
