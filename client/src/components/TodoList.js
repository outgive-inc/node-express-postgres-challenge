import React, { useEffect, useState } from "react";
import TodoListItem from "./TodoListItem";
import { useHttp } from "../hooks/useHTTP";

import { PlusCircleIcon } from "@heroicons/react/solid";
import FormModal from "./formModal";
import Error from "./Error";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { request, error } = useHttp();

  useEffect(() => {
    const fetchData = async () => {
      const data = await request("/api/v1/tasks");
      data.sort((a, b) => b.id - a.id);
      setTodos(data);
    };
    fetchData();
  }, []);

  const createTodo = async (todo) => {
    const data = await request("/api/v1/tasks", "POST", todo);

    setTodos([data[0], ...todos]);
  };

  return (
    <>
      {error ? <Error /> : null}
      <FormModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        actionTodo={createTodo}
      />
      <div className="flex justify-center my-3">
        <hr className="absolute top-20 w-7/12" />
        <PlusCircleIcon
          onClick={() => setOpenModal(!openModal)}
          className="relative h-20 w-20 text-gray-600 hover:text-gray-900 cursor-pointer"
        />
      </div>
      <div></div>
      {todos.map((todo) => {
        return <TodoListItem key={todo.id} todo={todo} />;
      })}
    </>
  );
};

export default TodoList;
