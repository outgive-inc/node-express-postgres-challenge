import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  ArrowRightIcon,
  ExclamationIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import { useHttp } from "../hooks/useHTTP";
import ConfirmModal from "./confirmModal";
import FormModal from "./formModal";
import Error from "./Error";

const Todo = () => {
  const [, , id] = useLocation().pathname.split("/");
  const history = useHistory();
  const [todo, setTodo] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);

  const { request, error, clearError } = useHttp();

  useEffect(() => {
    const fetchTodo = async () => {
      const data = await request(`/api/v1/tasks/${id}`);
      setTodo(data);
    };

    fetchTodo();
  }, []);

  const deleteTodo = async () => {
    const data = await request(`/api/v1/tasks/${id}`, "DELETE");
    history.goBack();
  };

  const updateTodo = async (data) => {
    const updatedTodo = await request(`/api/v1/tasks/${id}`, "PUT", data);

    setTodo(updatedTodo);
  };

  if (error) {
    clearError();
  }

  return (
    <>
      {error ? <Error /> : null}
      <ConfirmModal
        open={openModal}
        setOpen={setOpenModal}
        deleteTodo={deleteTodo}
      />
      <FormModal
        isOpen={openFormModal}
        setIsOpen={setOpenFormModal}
        actionTodo={updateTodo}
        todo={todo}
      />
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between">
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              {todo.title}
            </h2>
            {!todo.completed ? (
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            ) : (
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                Completed
              </span>
            )}
          </div>
          <div>
            <ArrowRightIcon
              onClick={() => history.goBack()}
              className="flex-shrink-0 h-10 w-10 text-gray-500 hover:text-gray-800 cursor-pointer"
            />
          </div>
        </div>

        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Details</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {todo.details || <i>No Content</i>}
              </dd>
            </div>

            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Actions</dt>
              <dd className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="mt-5 flex lg:mt-0 lg:ml-4">
                  <span className="hidden sm:block">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setOpenFormModal(!openFormModal)}
                    >
                      <PencilIcon
                        className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                      Edit
                    </button>
                  </span>
                  <span className="sm:ml-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setOpenModal(!openModal)}
                    >
                      <ExclamationIcon
                        className="h-5 w-5 text-white mr-2"
                        aria-hidden="true"
                      />
                      DELETE
                    </button>
                  </span>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default Todo;
