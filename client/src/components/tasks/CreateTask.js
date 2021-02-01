import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTask } from "../../actions/taskActions";

const CreateTask = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: "",
    details: "",
  });
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const [completed, setCompleted] = useState(false);

  const { title, details } = task;
  const onInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    if (task.title.length > 10) {
      setTitleError(false);
    }
    if (task.details.length > 10) {
      setDetailsError(false);
    }
  };

  const onSwitchChange = (e) => {
    setCompleted(!completed);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (task.title.length < 10) {
      setTitleError(true);
    }
    if (task.details.length < 10) {
      setDetailsError(true);
    }

    if (task.title.length > 10 && task.details.length > 10) {
      let taskObject = {
        title: task.title,
        details: task.details,
        completed: completed,
      };
      dispatch(createTask(taskObject, history));
    }
  };

  return (
    <div className="container">
      <div className="col-md-6 col-12 mx-auto shadow mt-5 p-5">
        <h2 className="text-center mb-4">Create Task</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className={!titleError ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
              placeholder="Enter task title"
              name="title"
              value={title}
              onChange={(e) => onInputChange(e)}
            />
            {!titleError ? null : <div className={!titleError ? "hidden" : "invalid-feedback"}>Please enter a valid title</div>}
          </div>
          <div className="form-group">
            <input
              type="text"
              className={!detailsError ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
              placeholder="Enter Task Details"
              name="details"
              value={details}
              onChange={(e) => onInputChange(e)}
            />
            {!detailsError ? null : <div className={!detailsError ? "hidden" : "invalid-feedback"}>Please enter a valid details</div>}
          </div>
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customSwitch1"
              value={completed}
              name="completed"
              checked={completed}
              onChange={(e) => onSwitchChange(e)}
            />
            <label className="custom-control-label mb-3" for="customSwitch1">
              Completed? Click to set it true
            </label>
          </div>
          <button className="btn btn-primary btn-block">Create Task</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
