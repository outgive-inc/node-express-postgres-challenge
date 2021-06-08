import { useState } from 'react';

export default function EditTaskForm(props) {
  const { updateTask, buttonText, editErrorMessage, setShowEditModal } = props;
  const [ taskId ] = useState(props.taskId);
  const [ title, setTitle ] = useState(props.title);
  const [ details, setDetails ] = useState(props.details);
  const [ completed ] = useState(props.completed);

  const onSubmit = (e) => {
    e.preventDefault();
    updateTask(taskId, title, details, completed);
    if (title) setShowEditModal(false);
  };

  return (
    <form onSubmit={onSubmit} className="modalForm">
      <div className="formField">
        <label className="formLabel">Task Title * </label>
        <input className="formInput" type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}></input>
      </div>
      <div className="formField">
        <label className="formLabel">Task Details </label>
        <input className="formInput" type="text" value={details} onChange={(e) => {setDetails(e.target.value)}}></input>
      </div>
      <div>
        <input className="modalButton" type="submit" value={buttonText}></input>
        {editErrorMessage.length > 0 && <span className="errorMessage">{editErrorMessage}</span>}
      </div>
    </form>
  );
}