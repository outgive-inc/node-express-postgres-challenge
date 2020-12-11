import React, { useEffect, useContext } from "react";
import TaskFinder from "../apis/TaskFinder";
import { TasksContext } from "../context/TasksContext";
import { useHistory } from "react-router-dom";

const TaskList = (props) => {
  const { tasks, setTasks } = useContext(TasksContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TaskFinder.get("/");
        console.log(response.data.data.tasks);
        setTasks(response.data.data.tasks);
      } catch (err) {}
    };
    setTimeout(function(){
      fetchData();
    },100);
    
  });

  const handleCompleted = async (e, id, coms) => {
    e.stopPropagation();
    try {
      var comss = 0;
      if(coms){
        var comss = 1;
      } 
      const response = await TaskFinder.put(`/${id}/toggle`);
      setTasks(
        tasks.filter((task) => {
          return task.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await TaskFinder.delete(`/${id}`);
      setTasks(
        tasks.filter((task) => {
          return task.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/tasks/${id}/update`);
  };

  const handleTaskSelect = (id) => {
    history.push(`/tasks/${id}`);
  };



  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Task</th>
            <th scope="col">Details</th>
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task) => {
              return (
                <tr
                  onClick={() => handleTaskSelect(task.id)}
                  key={task.id}
                >
                  <td>{task.title}</td>
                  <td>{task.details}</td>
                  <td>
                    <button
                      onClick={(e) => handleCompleted(e, task.id, task.completed)}
                      className={ task.completed ? "btn btn-success":"btn btn-danger" }
                    >
                      { task.completed ? 'Completed' : 'Incomplete' }
                    </button>
                  </td>
                  
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, task.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, task.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
         
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
