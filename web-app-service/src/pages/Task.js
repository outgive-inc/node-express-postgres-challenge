import React, { useEffect, useState } from "react";
import AddTask from "../components/AddTask/AddTask";
import TaskList from "../components/TaskList/TaskList";
import TaskDetails from "../components/TaskDetails/TaskDetails";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [task, setTask] = useState("");

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5000/api/v1/tasks");
    const tasks = await response.json();
    setTasks(tasks.data);
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const onHandleSubmitTask = async (title, details) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, details }),
    };
    const response = await fetch(
      "http://localhost:5000/api/v1/task",
      requestOptions
    );
    const task = await response.json();
    if (task.success) {
      let newTasks = [...tasks];
      newTasks.push(task.data);
      setTasks(newTasks);
      setAddTask(false);
    }
  };

  const onAddSubTask = async (id, title) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: id, title }),
    };
    const response = await fetch(
      "http://localhost:5000/api/v1/sub-task",
      requestOptions
    );
    const subTask = await response.json();
    if (subTask.success) {
      // setTasks(newTasks);
    }
  };

  const onHandleViewTask = (task) => {
    setTask(task);
  };

  if (addTask) {
    return (
      <AddTask
        onSubmitData={onHandleSubmitTask}
        onCancelTask={() => {
          setAddTask(false);
        }}
      />
    );
  }

  if (task) {
    return <TaskDetails {...task} />;
  }

  return (
    <div className="tasks-container mx-12">
      <TaskList
        tasks={tasks}
        onAddTask={() => setAddTask(true)}
        onAddSubTask={(id, title) => onAddSubTask(id, title)}
        onHandleViewTask={(id) => onHandleViewTask(id)}
      />
    </div>
  );
}
