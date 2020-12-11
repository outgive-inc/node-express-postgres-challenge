import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TasksContext } from "../context/TasksContext";
import TaskFinder from "../apis/TaskFinder";


const TaskDetailPage = () => {
  const { id } = useParams();
  const { selectedTask, setSelectedTask } = useContext(
    TasksContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TaskFinder.get(`/${id}`);
        console.log(response.data.data.task);

        setSelectedTask(response.data.data.task);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  });


  return (
    
    <div>
      {selectedTask && (
          
        <>

            <div>
            <h1 className="text-center">
                View Task
            </h1>
            </div>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    value={selectedTask.title}
                   
                    id="title"
                    className="form-control"
                    type="text"
                    readOnly
                />
            </div>

            <div className="form-group">
                <label htmlFor="details">Details</label>
                <input
                    value={selectedTask.details}
                    
                    id="details"
                    className="form-control"
                    type="text"
                    readOnly
                />
            </div>

            <div className="form-group">
                <label htmlFor="details">Status</label>
                <input
                    value={selectedTask.completed? "Completed": "Incomplete"}
                    
                    id="details"
                    type="text"
                    className={selectedTask.completed? " form-control text-white bg-success": "form-control text-white bg-danger"}
                  
                    
                />
            </div>
            
            <a
                type="submit"
                href="/"
                className="btn btn-warning"
            >
                Back
            </a>
      
         
        </>
      )}
    </div>
    
  );
};

export default TaskDetailPage;