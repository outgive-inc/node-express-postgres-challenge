import React, { useEffect, useState } from "react";
import TodoListItem from "./TodoListItem";
import useRequest from "../hooks/useRequest";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const { doRequest, errors } = useRequest({
    url: "/api/v1/tasks",
    method: "get",
    onSuccess: (data) => setTodos(data),
  });

  useEffect(() => {
    const fetchTodos = async () => {
      await doRequest();
    };

    fetchTodos();
  }, []);

  return (
    <>
      {errors}
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default TodoList;
