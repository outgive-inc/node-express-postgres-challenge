import React, { useState, useEffect, useRef } from "react";
import EditTask from "../modals/EditTask";

const Card = ({ task, deleteTask }) => {
  const [modal, setModal] = useState(false);
  const title = task.title;
  const details = task.details;
  const [completed, setCompleted] = useState(task.completed);

  const refDetails = useRef();
  const clickComplete = useRef(false);

  useEffect(() => {
    if (clickComplete.current) {
      updateTask();
    }
  }, [completed]);

  const toggle = () => {
    setModal(!modal);
  };

  const toggleDetails = () => {
    refDetails.current.hidden = !refDetails.current.hidden;
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleCompleted = () => {
    clickComplete.current = true;
    setCompleted(!completed);
  };

  const updateTask = async () => {
    try {
      const body = { title, details, completed };
      await fetch(`http://localhost:5000/api/v1/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="card-wrapper mr-5 mb-5">
      <div className="card-top"></div>
      <div className="task-holder">
        <button
          className="card-title btn btn-primary shadow-none"
          onClick={toggleDetails}
        >
          {title}
        </button>
        <p ref={refDetails} hidden={true}>
          {details}
        </p>
        <div style={{ position: "absolute", right: "10px", bottom: "5px" }}>
          <i
            className={
              completed
                ? "fa fa-check-square-o fa-lg mr-3"
                : "fa fa-square-o fa-lg mr-3"
            }
            style={{ cursor: "pointer" }}
            onClick={handleCompleted}
          ></i>
          <i
            className="fa fa-pencil-square fa-lg mr-3"
            style={{ cursor: "pointer" }}
            onClick={() => setModal(true)}
          ></i>
          <i
            className="fa fa-trash-o fa-lg"
            style={{ cursor: "pointer" }}
            onClick={handleDelete}
          ></i>
        </div>
      </div>
      <EditTask
        modal={modal}
        toggle={toggle}
        task={task}
        completed={completed}
      />
    </div>
  );
};

export default Card;
