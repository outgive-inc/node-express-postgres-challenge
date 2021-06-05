import React, { Fragment, useEffect, useState } from "react";

import AddTodo from "./AddTodo";
import EditTodo, { MODES } from "./EditTodo";

import "./TodoList.css"

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [mode , setMode] = useState(undefined)

  //delete todo function

  const deleteTodo = async id => {
    try {
      await fetch(`http://localhost:4001/api/v1/tasks/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/v1/tasks");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateDataSet = (newTodo) => {
    
    setTodos(todos.map((todo) => todo.id  === newTodo.id ? newTodo : todo))
  }

  const addTodo = (newTodo) => {
    setTodos([  newTodo , ...todos])
  }

  useEffect(() => {
    getTodos();
  }, []);

  

  return (
    <Fragment>
      <AddTodo addTodo={addTodo} />
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td onClick={() => {
                setMode(MODES.READ)
              }} 
              data-toggle="modal"
              data-target={`#id${todo.id}`}
              className="table-cell-title"
              
              >{todo.title}</td>
              <td>
                <EditTodo todo={todo} updateDataSet={updateDataSet} mode={mode} setMode={() => setMode(undefined)}/>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default TodoList;