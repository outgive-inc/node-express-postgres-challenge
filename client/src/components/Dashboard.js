import React, { useState, useEffect } from "react";
import Task from "./Task.js";
import AddTask from "./AddTask";

export default function Dashboard() {
  const [state] = useState({
    api: "http://localhost:5001/api/v1",
    count: 0,
  });
  const [tasks, setTasks] = useState([]);
  const [addTask, setAddTask] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState({
    message: "",
    class: "",
  });

  useEffect(() => {
    fetchTasks();
  }, [state.count, fetchTasks]);

  function fetchTasks() {
    fetch(`${state.api}/tasks`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          if (result.data.length > 0) {
            setTasks(result.data);
          }
        } else {
          displayFeedbackMessage("Could not fetch tasks", 500);
        }
      });
  }

  function displayFeedbackMessage(message, success) {
    const className = success === 200 ? "alert-success" : "alert-danger";
    setFeedbackMessage({ message: message, class: className });
    setTimeout(() => {
      setFeedbackMessage("");
    }, 1000);
  }

  function closeAddTask(newTask, status) {
    setAddTask(false);
    if (status === 200) {
      if (!!newTask) {
        const newTasks = [...tasks];
        newTasks.push(newTask);
        setTasks(newTasks);
        displayFeedbackMessage("Task added succesfully", 200);
      } else {
        displayFeedbackMessage("Something went wrong", 500);
      }
    }
  }

  function deleteTask(id) {
    if (id !== "" && typeof id !== "undefined") {
      if (window.confirm("Are you sure you want to delete task? ")) {
        const options = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        };
        fetch(`${state.api}/tasks/${id}`, options)
          .then((res) => res.json())
          .then(async (response) => {
            if (response.status === 200) {
              const newTasks = [...tasks];
              const remainingArr = newTasks.filter((task) => task.id !== id);
              setTasks(remainingArr);
              displayFeedbackMessage("Task deleted succesfully", 200);
            } else {
              displayFeedbackMessage("Something went wrong", 500);
            }
          });
      }
    }
  }

  return (
    <>
      <div className={`alert ${feedbackMessage.class}`}>
        {feedbackMessage.message}
      </div>
      <div className="container ml-5">
        <div className="row" style={styles.titleRow.container}>
          <div className="col-md-8 col-sm-12">
            <h1 style={styles.titleRow.taskTitle}>My Tasks</h1>
          </div>
          <div className="col-md-4 col-sm-12" style={{ marginTop: "10px" }}>
            <button
              className="btn btn-success"
              onClick={() => {
                setAddTask(true);
              }}
            >
              Add task
            </button>
          </div>
        </div>
        {addTask ? (
          <div className="row">
            <div className="col-md-4 col-sm-8" md={4} sm={8}>
              <AddTask closeAddTask={closeAddTask}></AddTask>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div style={styles.tasksContainer}>
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              fetch={fetchTasks}
            />
          );
        })}
      </div>
    </>
  );
}

const styles = {
  titleRow: {
    container: {
      marginTop: "100px",
      display: "flex",
    },
    taskTitle: {
      fontWeight: "300",
    },
    addBtn: {
      padding: "5px 10px 5px 10px",
    },
  },
  tasksContainer: {
    marginLeft: "70px",
    marginTop: "50px",
  },
};
