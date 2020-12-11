import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { TasksContext } from "../context/TasksContext";
import TaskFinder from "../apis/TaskFinder";

const UpdateTask = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const { tasks } = useContext(TasksContext);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await TaskFinder.get(`/${id}`);
      console.log(response.data.data);
      setTitle(response.data.data.task.title);
      setDetails(response.data.data.task.details);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = await TaskFinder.put(`/${id}`, {
      title,
      details,
    });
    history.push("/");
  };

  const handleBack = async (e) => {
    e.preventDefault();
    
    history.push("/");
  };

  return (
    <div>
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
        
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
        <button
          type="submit"
          onClick={handleBack}
          className="btn btn-warning"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
