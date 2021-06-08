import { useState} from 'react';
import TaskModal from './TaskModal';
import './Task.css';

export default function Task(props) {
  const { taskInfo, updateTask, deleteTask, editErrorMessage, setEditErrorMessage } = props;
  const [ completed, setCompleted ] = useState(taskInfo.completed);
  const [ showEditModal, setShowEditModal ] = useState(false);
  const [ showDeleteModal, setShowDeleteModal ] = useState(false);
  const [ showDetails, setShowDetails ] = useState(false);

  const updateHandler = () => {
    updateTask(taskInfo.id, taskInfo.title, taskInfo.details, !completed);
    setCompleted(!completed);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditErrorMessage("");
  };

  return (
    <div className="taskContainer" key={taskInfo.id}>
      {/* Task Title */}
      <header className="taskHeader" onClick={() => setShowDetails(!showDetails)}>
        <h2>{showDetails ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}  {taskInfo.title}</h2>
        {completed && <h2><i className="fas fa-check"></i></h2>}
      </header>

      {/* Task Details and Buttons */}
      {showDetails && (
        <>
          <div className="taskBody">
            <h3>Details: {taskInfo.details}</h3>
            <h3>Status: {completed ? "Completed" : "Incomplete"}</h3>
          </div>

          <div className="taskFooter">
            <button className="taskStatusBtn" onClick={updateHandler}>{completed ? "Mark as Incomplete" : "Mark as Complete"}</button>
            <button className="taskEditBtn" onClick={() => setShowEditModal(true)}>Edit</button>
            <button className="taskDeleteBtn" onClick={() => setShowDeleteModal(true)}>Delete</button>
          </div>

          {/* Edit Task Modal */}
          <TaskModal
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal} 
            onClose={closeEditModal} 
            header="Edit Task"
            title={taskInfo.title} 
            details={taskInfo.details} 
            completed={taskInfo.completed} 
            taskId={taskInfo.id}
            updateTask={updateTask}
            editErrorMessage={editErrorMessage}
          />
          <TaskModal
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            header="Delete Task"
            title={taskInfo.title} 
            taskId={taskInfo.id}
            deleteTask={deleteTask}
          />
        </>
      )}
    </div>
  );
}