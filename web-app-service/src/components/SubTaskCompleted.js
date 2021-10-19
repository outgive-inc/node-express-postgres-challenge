import React, { Fragment, useState, useRef } from "react";

const SubTaskCompleted = ({ subTask }) => {

  const [completed, setCompleted] = useState(subTask.completed);

  const clickComplete = useRef(false);

  const setCheckboxValue = () => {
    clickComplete.current = true;
    const opposite = !completed;
    setCompleted(opposite);
    setComplete(opposite);
  };

  const setComplete = async (opposite) => {
    try {
      const body = JSON.stringify({completed:opposite});
      await fetch(`http://localhost:5000/api/subtasks/complete/${subTask.subTaskId}`, {
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

export default SubTaskCompleted;