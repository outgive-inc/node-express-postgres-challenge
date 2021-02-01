import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadTask, deleteTask } from "../../actions/taskActions";

const Task = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const task = useSelector((state) => state.task.task);

  useEffect(() => {
    dispatch(loadTask(id));
  }, []);

  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h4 className="mt-2">Task Title : {task.title}</h4>
      <hr />

      <ul className="list-group col-md-6 col-12">
        <li className="list-group-item">
          {" "}
          <span className="font-weight-bold"> Id : </span>
          {task.id}{" "}
        </li>
        <li className="list-group-item">
          {" "}
          <span className="font-weight-bold"> Title : </span> {task.title}{" "}
        </li>
        <li className="list-group-item">
          {" "}
          <span className="font-weight-bold"> Details : </span> {task.details}{" "}
        </li>
        <li className="list-group-item">
          {" "}
          <span className="font-weight-bold"> completed : </span> {task.completed ? "True" : "False"}{" "}
        </li>
      </ul>
      <Link className="btn btn-outline-primary m-2" to={`/tasks/update/${task.id}`}>
        Update
      </Link>
      <Link className="btn btn-danger m-2" onClick={() => dispatch(deleteTask(task.id))}>
        Delete
      </Link>
    </div>
  );
};

export default Task;
