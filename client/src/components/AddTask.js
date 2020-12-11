import React, { useState, useContext } from "react";
import TaskFinder from "../apis/TaskFinder";
import { TasksContext } from "../context/TasksContext";

const AddTask = () => {
  const { addTasks } = useContext(TasksContext);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await TaskFinder.post("/", {
        title,
        details,
      });
      console.log(response.data.data);
      addTasks(response.data.data.task);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mb-4">
      <form action="">
      <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="details">Details</label>
          <input
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            id="details"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-row">
          
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
