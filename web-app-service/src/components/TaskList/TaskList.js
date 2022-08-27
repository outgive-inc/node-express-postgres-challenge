import React from "react";
import TaskItem from "../TaskItem/TaskItem";

export default function TaskList({
  tasks,
  onAddTask,
  onAddSubTask,
  onHandleViewTask,
}) {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-4xl">Task List</h1>
        <button
          onClick={onAddTask}
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Add task
        </button>
      </div>
      <ul className="divide-y divide-gray-200 mt-10">
        {tasks.length > 0 &&
          tasks.map((task, i) => (
            <TaskItem
              task={task}
              onAddSubTask={onAddSubTask}
              onHandleViewTask={onHandleViewTask}
              key={i}
            />
          ))}
      </ul>
    </div>
  );
}
