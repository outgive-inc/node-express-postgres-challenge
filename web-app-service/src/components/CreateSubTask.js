import React, { Fragment, useState } from "react";

const CreateSubTask = ({ task }) => {

    const [title, setTitle] = useState("");

    const createSubTask = async e => {

        e.preventDefault();

        try {
            const body = { title };

            await fetch(`http://localhost:5000/api/subtasks/create/${task.taskId}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });

            setTitle("");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <form onSubmit={createSubTask}>
                <div className="form-group d-flex">
                    <label>Sub Task:</label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </Fragment>
    );
};

export default CreateSubTask;