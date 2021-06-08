import { useEffect } from 'react';
import './TaskModal.css';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';
import DeleteTaskForm from './DeleteTaskForm';

export default function TaskModal(props) {

  const {
    showCreateModal,
    showEditModal,
    setShowEditModal,
    showDeleteModal,
    setShowDeleteModal,
    deleteTask,
    onClose,
    header,
    title,
    details,
    completed,
    taskId,
    updateTask,
    createTask,
    createErrorMessage,
    editErrorMessage,
  } = props;

  // Add an event listener to listen for ESC key to close modal
  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
    }
  })

  // Pressing ESC will close the modal
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  return (
    <div className={`taskModal ${showCreateModal || showEditModal || showDeleteModal ? 'show' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{header}</h4>
          <button className="closeButton" onClick={onClose}><i className="fas fa-times"></i></button>
        </div>

        <div className="modal-body">
          {/* Shows a different modal based on the passed in header */}
          {header === "Add New Task" && (
            <AddTaskForm 
              createTask={createTask}
              createErrorMessage={createErrorMessage}
            />
          )}
          {header === "Edit Task" && (
            <EditTaskForm
              title={title}
              details={details}
              completed={completed}
              taskId={taskId}
              buttonText="Update Task"
              updateTask={updateTask}
              setShowEditModal={setShowEditModal}
              editErrorMessage={editErrorMessage}
            />
          )}
          {header === "Delete Task" && (
            <DeleteTaskForm
              title={title}
              taskId={taskId}
              buttonText="Delete Task"
              setShowDeleteModal={setShowDeleteModal}
              deleteTask={deleteTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}