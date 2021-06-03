import React, { useState } from "react";
import { Link } from "react-router-dom";

import { LinkIcon } from "@heroicons/react/solid";
import { Switch } from "@headlessui/react";
import { useHttp } from "../hooks/useHTTP";

const TodoListItem = ({ todo }) => {
  const [completed, setCompleted] = useState(todo.completed);
  const { request } = useHttp();

  const completeTodo = async () => {
    const data = await request(`/api/v1/tasks/${todo.id}`, "PUT", {
      title: todo.title,
      completed: !completed,
    });

    setCompleted(data.completed);
  };

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between border border-grey rounded p-3 mb-2">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {todo.title}
          </h2>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              {!completed ? (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              ) : (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  Completed
                </span>
              )}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Switch.Group>
                <div className="flex items-center">
                  <Switch.Label className="mr-4">
                    Toggle to complete
                  </Switch.Label>
                  <Switch
                    checked={completed}
                    onChange={completeTodo}
                    className={`${
                      completed ? "bg-blue-600" : "bg-gray-200"
                    } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    <span
                      className={`${
                        completed ? "translate-x-6" : "translate-x-1"
                      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                  </Switch>
                </div>
              </Switch.Group>
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <Link to={`/todos/${todo.id}`}>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LinkIcon
                  className="-ml-1 mr-2 h-5 w-5 text-white"
                  aria-hidden="true"
                />
                Details
              </button>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default TodoListItem;
