import React, { Fragment, useState } from "react";

const EditTask = ({ task }) => {

    const [title, setTitle] = useState(task.title);
    const [details, setDetails] = useState(task.details);

    //updateTask
    const upDateTask = async (e) => {
        e.preventDefault();
        try {
            const body = { title, details };
            
            await fetch(`http://localhost:5000/api/tasks/update/${task.taskId}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });

            window.location = "/";
        } catch (err) {
            console.err(err.message);
        }
    }

    return (
        <Fragment>
            <form onSubmit={e => upDateTask(e)}>
                <div className="form-group">
                    <label>Task:</label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label >Details:</label>
                    <input type="text"
                        className="form-control"
                        value={details}
                        onChange={e => setDetails(e.target.value)} />
                    <small id="emailHelp" className="form-text text-muted">A short description of your new task.</small>
                </div>

                <button type="submit" className="btn btn-warning">Update</button>
            </form>
        </Fragment>
    )
}

export default EditTask;