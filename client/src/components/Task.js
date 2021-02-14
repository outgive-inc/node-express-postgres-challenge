import React, { useState } from "react";

export default function Task(props) {
  const [editTask, setEditTask] = useState(false);
  const api = "http://localhost:5001/api/v1";
  const [error, setError] = useState();

  function editTaskClicked() {
    fetchDetails(props.task.id);
  }

  function fetchDetails(id) {
    fetch(`${api}/tasks/${id}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          setEditTask(response.data[0]);
        }
      });
  }

  function saveChanges() {
    const valid = checkAndSetFieldErrors();
    if (valid) {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTask),
      };

      fetch(`${api}/tasks/${editTask.id}`, options)
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 200) {
            setEditTask(false);
            props.fetch();
          }
        });
    }
  }

  function checkAndSetFieldErrors() {
    let message = "";
    const fieldsToValidate = ["title", "details"];
    for (let field of fieldsToValidate) {
      if (editTask[field] === "") {
        message = `${field} cannot be empty`;
        break;
      }
    }
    if (message !== "") {
      setError(message);
      return false;
    }
    return true;
  }

  function fieldOnChange(field) {
    setError("");
    const task = editTask;
    task[field.name] = field.value;
    setEditTask(task);
  }

  function toggleCompleteTask(task) {
    task.completed = !task.completed;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    };

    fetch(`${api}/tasks/${task.id}`, options)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          props.fetch();
        }
      });
  }

  function closeEditTask() {
    setEditTask(false);
  }

  return (
    <div className="row m-0">
      <div className="col-md-4 col-sm-9">
        <div style={styles.card.wrapper}>
          <div>
            {editTask ? (
              <>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Title</span>
                  </div>
                  <input
                    type="text"
                    placeholder={editTask.title}
                    name="title"
                    onChange={(e) => {
                      fieldOnChange(e.target);
                    }}
                  ></input>
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Details</span>
                  </div>
                  <textarea
                    placeholder={editTask.details}
                    name="details"
                    onChange={(e) => {
                      fieldOnChange(e.target);
                    }}
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => {
                      saveChanges();
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      closeEditTask();
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <span className="text-danger">{error}</span>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  className="pull-left mt-2 mr-1"
                  checked={props.task.completed}
                  onChange={() => {
                    toggleCompleteTask(props.task);
                  }}
                ></input>
                <span>{props.task.title}</span>
                <i
                  className="fa fa-eye pull-right text-secondary"
                  aria-hidden="true"
                  onClick={() => {
                    editTaskClicked();
                  }}
                ></i>
                <i
                  className="fa fa-trash pull-right text-danger"
                  aria-hidden="true"
                  onClick={() => {
                    props.deleteTask(props.task.id);
                  }}
                ></i>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    wrapper: {
      backgroundColor: "white",
      padding: "25px",
      paddingBottom: "55px",
      marginBottom: "15px",
      borderRadius: "5px",
      boxShadow: "5px 10px #D3D3D3",
    },
  },
};
