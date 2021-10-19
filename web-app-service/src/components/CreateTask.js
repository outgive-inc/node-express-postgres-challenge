import React, { Fragment, useState, useRef } from "react";

const CreateTask = () => {

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    const refTitleError = useRef();
    const refDetailsError = useRef();

    const createTask = async e => {

        e.preventDefault();

        if (title.length === 0 || title.length > 25) {
            refTitleError.current.hidden = false;
        } else {
            refTitleError.current.hidden = true;
        }

        if (details.length === 0 || details.length > 100) {
            refDetailsError.current.hidden = false;
        } else {
            refDetailsError.current.hidden = true;
        }

        if (
            refTitleError.current.hidden === true &&
            refDetailsError.current.hidden === true
        ) {
            try {

                const body = { title, details };

                await fetch("http://localhost:5000/api/tasks/create/",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    });

                window.location = "/";
            } catch (err) {
                console.error(err.message);
            }
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">
                PERN Exercise
            </h1>
            <form onSubmit={createTask}>
                <div className="form-group">
                    <label>Task:</label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                </div>
                <p className="error-message" ref={refTitleError} hidden={true}>
                    Field "Title" should have at least 1-25 characters.
                </p>
                <div className="form-group">
                    <label >Details:</label>
                    <input type="text"
                        className="form-control"
                        value={details}
                        onChange={e => setDetails(e.target.value)} />
                    <small id="emailHelp" className="form-text text-muted">A short description of your new task.</small>
                </div>
                <p className="error-message" ref={refDetailsError} hidden={true}>
                    Field "Details" should have at least 1-100 characters.
                </p>

                <button type="submit" className="btn btn-primary">Create New Task</button>
            </form>
        </Fragment>
    );
};

export default CreateTask;