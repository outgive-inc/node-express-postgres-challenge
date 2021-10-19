import React, { Fragment } from 'react';

const DeleteTasks = ({ task }) => {

    //delete a task
    const deleteTask = async () => {
        try {

            await fetch(`http://localhost:5000/api/subtasks/deleteAll/${task.taskId}`, {
                method: "DELETE",
            });

            await fetch(`http://localhost:5000/api/tasks/delete/${task.taskId}`, {
                method: "DELETE",
            });

            window.location = "/";

        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <span data-toggle="tooltip">
                <button type="button"
                    class="btn btn-danger"
                    data-toggle="modal"
                    data-target={`#delete${task.taskId}`}>
                    <i className="fa fa-trash"></i>
                </button>
            </span>

            <div class="modal" id={`delete${task.taskId}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Modal Heading</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                            Deleting "{task.title}" will also delete its subtasks. Continue?
                        </div>

                        <div class="modal-footer">
                            <button className="btn btn-danger"
                                onClick={() => deleteTask(task.taskId)}
                                data-placement="top"
                                title="Delete Task">
                                Confirm Delete
                            </button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default DeleteTasks;