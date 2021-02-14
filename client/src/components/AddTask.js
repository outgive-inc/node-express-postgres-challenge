import React, { useState } from "react";

export default function AddTask(props) {
  const [title, setTitle] = useState({ name: "title", value: "", error: "" });
  const [details, setDetails] = useState({
    name: "details",
    value: "",
    error: "",
  });
  const API = "http://localhost:5001/api/v1";

  function addTask(body) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch(`${API}/tasks`, options)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          body["id"] = response.data[0].id;
          props.closeAddTask(body, response.status);
        }
      });
  }

  function addTaskBtnClicked() {
    const fields = [title, details];
    const modifiers = [setTitle, setDetails];
    let valid = true;
    let body = {};
    for (let field in fields) {
      body[fields[field].name] = fields[field].value;
      const error = checkAndSetFieldErrors(fields[field], modifiers[field]);
      if (!error) {
        valid = false;
      }
    }
    if (valid) {
      addTask(body);
    }
  }

  function checkAndSetFieldErrors(field, modifier) {
    if (!field.value) {
      modifier((prevState) => ({
        ...prevState,
        error: "Field cannot be empty",
      }));
      return false;
    }
    return true;
  }

  return (
    <div style={styles.card.outer}>
      <div>
        <p className="pull-left">New task</p>
        <span
          className="pull-right clickable close-icon"
          data-effect="fadeOut"
          onClick={props.closeAddTask}
        >
          <i className="fa fa-times"></i>
        </span>
      </div>

      <div className={!title.error ? "input-group mb-3" : "input-group"}>
        <div className="input-group-prepend">
          <span className="input-group-text">Title</span>
        </div>
        <input
          type="text"
          className={
            !!title.error ? "border-danger form-control" : "form-control"
          }
          onChange={(e) => {
            setTitle((prevTitle) => ({
              ...prevTitle,
              value: e.target.value,
              error: "",
            }));
          }}
        ></input>
      </div>
      <small className="mb-3 text-danger">{title.error}</small>
      <div className={!details.error ? "input-group mb-3" : "input-group"}>
        <div className="input-group-prepend">
          <span className="input-group-text">Details</span>
        </div>
        <textarea
          className={
            !!details.error ? "border-danger form-control" : "form-control"
          }
          onChange={(e) => {
            setDetails((prevDetails) => ({
              ...prevDetails,
              value: e.target.value,
              error: "",
            }));
          }}
        ></textarea>
      </div>
      <small className="mb-3 text-danger">{details.error}</small>
      <div className="container text-center mt-3">
        <button className="btn btn-primary mr-2" onClick={addTaskBtnClicked}>
          Add
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            props.closeAddTask([], 500);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    outer: {
      padding: "10px",
      backgroundColor: "white",
      marginTop: "30px",
      borderRadius: "5px",
      boxShadow: "5px 10px #D3D3D3",
    },
  },
};
