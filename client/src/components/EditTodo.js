import React, { Fragment, useState } from "react";
import "./EditTodo.css"

export const MODES = {
  READ : 1,
  WRITE: 2
}

const ICONS = {
  TRUE: <span className="form-cb-icon">&#9989;</span>,
  FALSE: <span className="form-cb-icon">&#10060;</span>
}

const EditTodo = ({ todo , updateDataSet, mode , setMode }) => {
  const [title, setTitle] = useState(todo.title);
  const [details, setDetails] = useState(todo.details);
  const [completed, setCompleted] = useState(todo.completed);

  //edit description function

  const reset = () => {
    setTitle(todo.title)
    setDetails(todo.details)
    setCompleted(todo.completed)
    setMode()
  }

  const updateTitle = async e => {
    e.preventDefault();
    try {
      //console.log(description , 11)
      const body = { title , details , completed };
      let response = await fetch(
        `http://localhost:4001/api/v1/tasks/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
       response = await response.json()
        updateDataSet(response)




    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.id}`}
        
      >
        Edit
      </button>

      
      <div
        className="modal"
        id={`id${todo.id}`}
        
      >
        <form>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{todo.title}</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                data-keyboard="false"
              
                onClick={() => setTitle(todo.title)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
          <div className="form-field">
          <label>Title:</label>
              <input
                type="text"
                className="form-control form-text"
                value={title}
                placeholder="Title"
                onChange={e => setTitle(e.target.value)}
                disabled={mode === MODES.READ}
                pattern={"[A-Za-z0-9]{1,50}"}
          title={"Please enter alphanumic values upto 50 characters."}
          required
              />
              
              </div>
              <div className="form-field">
              <label>Description: </label>
              <textarea
                cols={2}
                rows={2}
                className="form-control form-textarea"
                value={details}
                placeholder="Description"
                onChange={e => setDetails(e.target.value)}
                disabled={mode === MODES.READ}
              />
              
              </div>
              <div className="form-field">
              <label>Completed:  </label>
              {mode === MODES.READ ?  (todo.completed ? ICONS.TRUE : ICONS.FALSE) : (<input
                type="checkbox"
                className="form-control form-checkbox"
                checked={completed}
                placeholder="Completed"
                onChange={e => setCompleted(e.target.checked)}
              
              />)}
              
              </div>
            </div>

            <div className="modal-footer">
              {mode !== MODES.READ && <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateTitle(e)}
                
              >
                Edit
              </button>}
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => reset()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
        </form>
      </div>
    </Fragment>
  );
};

export default EditTodo;
