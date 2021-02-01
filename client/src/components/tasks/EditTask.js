import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editTask, loadTask } from "../../actions/taskActions";

const EditTask = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [task, setTask] = useState({
    title: "",
    details: "",
  });
  const [error, setError] = useState({
    title: "",
    details: "",
  });
  const [completed, setCompleted] = useState(false);
  const taskInfo = useSelector((state) => state.task.task);

  const { title, details } = task;
  const onInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    if (e.target.value.length > 10) {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  const onSwitchChange = (e) => {
    setCompleted(!completed);
  };

  useEffect(() => {
    setTask({ ...task, title: taskInfo.title, details: taskInfo.details });
    setCompleted(taskInfo.completed);
  }, [taskInfo]);

  useEffect(() => {
    dispatch(loadTask(id));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (task.title.length < 10) {
      setError({ ...error, title: "Title can not be empty" });
    }
    if (task.details.length < 10) {
      setError({ ...error, details: "Details can not be empty" });
    }

    if (task.title.length > 10 && task.details.length > 10) {
      let taskObject = {
        title: task.title,
        details: task.details,
        completed: completed,
      };
      dispatch(editTask(taskObject, id, history));
    }
  };

  return (
    <div className="container">
      <div className="col-md-6 col-12 mx-auto shadow m-5 p-5">
        <h2 className="text-center mb-4">Update Task</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className={error.title === "" ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
              placeholder="Update the title"
              name="title"
              value={title}
              onChange={(e) => onInputChange(e)}
            />
            {error.title === "" ? null : <div className={error.title === null ? "hidden" : "invalid-feedback"}>Please enter a valid title</div>}
          </div>
          <div className="form-group">
            <input
              type="text"
              className={error.details === "" ? "form-control form-control-md" : "form-control form-control-md is-invalid"}
              placeholder="Update the details"
              name="details"
              value={details}
              onChange={(e) => onInputChange(e)}
            />
            {error.details === "" ? null : <div className={error.details === null ? "hidden" : "invalid-feedback"}>Please enter a valid details</div>}
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
              Completed? Toggle to set it true
            </label>
          </div>
          <button className="btn btn-warning btn-block">Update Task</button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
