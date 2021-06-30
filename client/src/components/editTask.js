import { useState, Fragment, useContext } from "react";
import { updateTask, getAllTask } from "../services/taskService";
import { Context } from "../store/taskStore";

const EditTask = ({ taskData }) => {
    const [, dispatch] = useContext(Context);
    const [task] = useState(taskData);
    const [title, setTitle] = useState(task.title);
    const [details, setDetails] = useState(task.details);
    const [completed, setCompleted] = useState(task.completed);

    const editTask = async (id) => {
        const body = { title, details, completed };
        try {
            const res = await updateTask(id, body);
            if (res) {
                const allTask = await getAllTask();
                if (allTask) {
                    dispatch({ type: "SET_TASK_LIST", payload: allTask });
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-secondary"
                data-toggle="modal"
                data-target={`#v${task.id}`}
            >
                Edit
            </button>

            <div className="modal fade" id={`v${task.id}`}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Task</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <form className="d-flex mt-5">
                                <input
                                    className="form-control m-1"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                ></input>
                                <input
                                    className="form-control m-1"
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                ></input>

                                <div className="form-check-inline m-1">
                                    <label className="form-check-label m-1">
                                        Is Completed?
                                    </label>
                                    <input
                                        className="form-check-input m-1"
                                        type="checkbox"
                                        value=""
                                        checked={completed}
                                        onChange={(e) =>
                                            setCompleted(e.target.checked)
                                        }
                                    ></input>
                                </div>
                                <button
                                    className="btn btn-primary m-1"
                                    onClick={() => editTask(task.id)}
                                >
                                    Update Task
                                </button>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditTask;
