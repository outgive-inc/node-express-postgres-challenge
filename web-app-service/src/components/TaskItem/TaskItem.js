import React, { useState } from "react";

export default function TaskItem({ task, onAddSubTask, onHandleViewTask }) {
  const [subTask, setSubTask] = useState("");
  const [titleInput, setTitleInput] = useState("");

  const onHandleSubTask = () => {
    if (!titleInput) {
      return;
    }
    onAddSubTask(subTask, titleInput);
    setSubTask("");
  };

  return (
    <div>
      <li className="py-4 flex justify-between">
        <p className="text-sm font-medium text-gray-900">{task.title}</p>
        <div>
          <button
            onClick={() => onHandleViewTask(task)}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            View
          </button>
          <button
            onClick={() => setSubTask(task.taskId)}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Add Sub Task
          </button>
        </div>
      </li>
      {subTask === task.taskId && (
        <>
          <div className="mb-4">
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Title"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </div>
          <button
            onClick={onHandleSubTask}
            className="group mb-4 relative w-half flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </>
      )}
    </div>
  );
}
