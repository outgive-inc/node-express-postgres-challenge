import React from "react";

export default function TaskDetails({
  taskId,
  title,
  details,
  completed,
  SubTasks,
}) {
  const onEditSubTask = (id) => {
    console.log(id);
  };

  const onDeleteTask = async () => {
    const response = await fetch(
      `http://localhost:5000/api/v1/task?taskId=${taskId}`,
      {
        method: "DELETE",
      }
    );
    if (response.success) {
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="mb-10">
        <div className="flex justify-between">
          <h1 className="text-4xl mb-4">{title}</h1>
          <button
            onClick={() => onDeleteTask(taskId)}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Delete Task
          </button>
        </div>
        <p>{details}</p>
      </div>
      <hr />
      <div className="mt-4">
        <h2 className="text-3xl">SubTasks</h2>
      </div>
      <ul className="divide-y divide-gray-200 mt-10">
        {SubTasks.length > 0 &&
          SubTasks.map((sTask, i) => (
            <li key={i} className="py-4 flex justify-between">
              <p className="text-sm font-medium text-gray-900">{sTask.title}</p>
              <button
                onClick={() => onEditSubTask(sTask.taskId)}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Edit Sub Task
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
