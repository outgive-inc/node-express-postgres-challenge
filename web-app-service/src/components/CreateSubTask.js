import React, { Fragment, useState } from "react";

const CreateSubTask = ({ task }) => {

    const [title, setTitle] = useState("");

    const onSubmitForm = async e => {

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
            <form onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label>Sub Task:</label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Create Sub Task</button>
            </form>
        </Fragment>
    );
};

export default CreateSubTask;