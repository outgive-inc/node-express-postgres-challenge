import React, { useEffect, useState } from "react";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/v1/tasks");
        const data = await response.json();

        setTodos(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default TodoList;
