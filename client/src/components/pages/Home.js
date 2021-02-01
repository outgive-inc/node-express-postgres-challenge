import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks, deleteTask } from "../../actions/taskActions";

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  return (
    <div className="container">
      <div className="py-4">
        <h1>Tasks</h1>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col" className="text-center">
                Title
              </th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task, index) => (
              <tr>
                <td className="">{task.title}</td>

                <td className="text-center">
                  <Link className="btn btn-primary m-1" to={`/tasks/${task.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-primary m-1" to={`/tasks/update/${task.id}`}>
                    Update
                  </Link>
                  <Link className="btn btn-danger m-1" onClick={() => dispatch(deleteTask(task.id))}>
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
