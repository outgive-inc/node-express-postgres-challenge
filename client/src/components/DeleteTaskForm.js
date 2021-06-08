
export default function EditTaskForm(props) {
  const { title, taskId, buttonText, deleteTask, setShowDeleteModal } = props;

  const onSubmit = (e) => {
    e.preventDefault();
    deleteTask(taskId);
    setShowDeleteModal(false);
  };

  return (
    <form onSubmit={onSubmit} className="modalForm">
      <div className="formField">
        Are you sure you want to delete the task "{title}"?
      </div>
      <div>
        <input className="modalButton" type="submit" value={buttonText}></input>
      </div>
    </form>
  );
}