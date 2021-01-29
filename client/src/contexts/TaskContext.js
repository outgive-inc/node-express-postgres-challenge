import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

const TaskContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [editItem, setEditItem] = useState(null);
  //Getting Task
  const getTask = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/tasks");
      const jsonData = await response.json();

      setTasks(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  //Getting Task Mount
  useEffect(() => {
    getTask();
  }, []);
  //Adding Task
  const addTask = (title, details) => {
    setTasks([...tasks, { title, details }]);
    getTask();
  };
  //Removing Task
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  //Get Single Task
  const findTask = (id) => {
    const item = tasks.find((task) => task.id === id);
    setEditItem(item);
  };
  //Editing Task
  const editTask = async (id, title, details) => {
    try {
      const newTasks = await tasks.map((task) => {
        if (task.id === id) {
          const newItem = { ...task, title, details };
          console.log(newItem);
          fetch(`http://localhost:3001/api/v1/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem),
          });
          return newItem;
        }
        return task;
      });
      setTasks(newTasks);
      setEditItem(null);
    } catch (err) {
      console.error(err.message);
    }
  };
  const toggleTask = async (id) => {
    try {
      const newTasks = await tasks.map((task) => {
        if (task.id === id) {
          const newItem = { ...task, completed: !task.completed };
          fetch(`http://localhost:3001/api/v1/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem),
          });
          return newItem;
        }
        return task;
      });
      setTasks(newTasks);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTask,
        addTask,
        removeTask,
        findTask,
        editTask,
        editItem,
        toggleTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
