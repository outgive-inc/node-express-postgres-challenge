import React, { useState, useContext, useEffect } from "react";
import { TaskContext } from "../contexts/TaskContext";

const TaskForm = () => {
  const intialState = {
    title: "",
    details: "",
  };

  const [field, setField] = useState(intialState);
  const { addTask, editTask, editItem } = useContext(TaskContext);
  const { title, details } = field;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setField({ ...field, [name]: value, err: "", success: "" });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (editItem === null) {
      try {
        const body = { ...field };
        await fetch("http://localhost:3001/api/v1/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        addTask(title, details);
        setField({ title: "", details: "" });
      } catch (err) {
        console.error(err.message);
      }
    } else {
      editTask(editItem.id, title, details);
    }
  };

  useEffect(() => {
    if (editItem !== null) {
      setField({ title: editItem.title, details: editItem.details });
    } else {
      setField({ title: "", details: "" });
    }
  }, [editItem]);

  return (
    <div>
      <form className="form" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-title form-input"
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleChangeInput}
        />
        <input
          type="text"
          className="form-details form-input"
          name="details"
          placeholder="Details"
          value={details}
          onChange={handleChangeInput}
        />
        <button disabled={title.length < 1} className="form-btn">
          {editItem ? "Edit Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
