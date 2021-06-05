import React, { Fragment, useState } from "react";

const AddTodo = ({addTodo}) => {
  const [title, setTitle] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { title };
      let response = await fetch("http://localhost:4001/api/v1/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      response =  await response.json()

      addTodo(response)
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5"> Todo List</h1>
      <form className="d-flex mt-5" name="fm" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter Title For Adding Todo"
          name="title"
          pattern={"[A-Za-z0-9]{1,50}"}
          title={"Please enter alphanumic values upto 50 characters."}
          required
        />
        &nbsp;&nbsp;&nbsp;
        <button className="btn btn-success" form="fm" type="submit">Add</button>
      </form>
    </Fragment>
  );
};

export default AddTodo;