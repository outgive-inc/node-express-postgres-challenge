import React, { Fragment, useState, useRef } from "react";

const TaskCompleted = ({ task }) => {

  const [completed, setCompleted] = useState(task.completed);

  const clickComplete = useRef(false);

  const setCheckboxValue = () => {
    clickComplete.current = true;
    const opposite = !completed;
    setCompleted(opposite);
    setComplete(opposite);
  };

  //send data to database upon toggling the checkbox
  const setComplete = async (opposite) => {
    try {
      const body = JSON.stringify({completed:opposite});
      await fetch(`http://localhost:5000/api/tasks/update/${task.taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Fragment><i
      className={
        completed
          ? "fa fa-check-square-o fa-lg mr-3"
          : "fa fa-square-o fa-lg mr-3"
      }
      style={{ cursor: "pointer" }}
      onClick={setCheckboxValue}
    ></i></Fragment>
  )
}

export default TaskCompleted;