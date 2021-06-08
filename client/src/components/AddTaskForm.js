import { useState } from 'react';

export default function AddTaskForm(props) {
  const { createTask, createErrorMessage } = props;
  const [ title, setTitle ] = useState("");
  const [ details, setDetails ] = useState("");
  const [ completed, setCompleted ] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    createTask(title, details, completed);
    setTitle("");
    setDetails("");
    setCompleted(false);
  };

  return (
    <form onSubmit={onSubmit} className="modalForm">
      <div className="formField">
        {/* <label>Task Title: </label> */}
        <input className="formInput" type="text" placeholder="Task Title *" value={title} onChange={(e) => {setTitle(e.target.value)}}></input>
      </div>
      <div className="formField">
        {/* <label>Task Details: </label> */}
        <input className="formInput" type="text" placeholder="Task Details" value={details} onChange={(e) => {setDetails(e.target.value)}}></input>
      </div>
      <div className="formField">
        <label>Completed: </label>
        <input type="checkbox" value={completed} onChange={(e) => {setCompleted(e.currentTarget.checked)}}></input>
      </div>
      <div>
        <input className="modalButton" type="submit" value="Create"></input>
        {createErrorMessage.length > 0 && <span className="errorMessage">{createErrorMessage}</span>}
      </div>
    </form>
  );
}