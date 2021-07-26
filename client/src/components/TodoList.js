import React, { Fragment, useEffect, useState } from "react";
import Card from "./Card";
import CreateTask from "../modals/CreateTask";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/tasks");
      const todoList = await response.json();

      setTodoList(todoList);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
        method: "DELETE",
      });

      setTodoList(todoList.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="header text-center">
        <h2>Todo List</h2>
        <button
          className="btn btn-primary shadow-none mt-2"
          onClick={() => setModal(true)}
        >
          Create Task
        </button>
      </div>
      <div className="task-container">
        {todoList.map((task) => (
          <Card key={task.id} task={task} deleteTask={deleteTask} />
        ))}
      </div>
      <CreateTask modal={modal} toggle={toggle} />
    </Fragment>
  );
};

export default TodoList;
