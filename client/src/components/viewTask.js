import { useState, Fragment } from "react";

const ViewTask = ({ taskData }) => {
    const [tasks] = useState(taskData);
    return (
        <Fragment>
            <button
                type="button"
                className="btn"
                data-toggle="modal"
                data-target={`#${taskData.id}`}
            >
                {tasks.title}
            </button>

            <div className="modal fade" id={tasks.id}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Task Info</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <div>
                                <strong>Title: </strong>
                                {tasks.title}
                            </div>
                            <div>
                                <strong>Details: </strong>
                                {tasks.details}
                            </div>
                            <div>
                                <strong>Is Comleted? </strong>
                                {`${tasks.completed}`}
                            </div>
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

export default ViewTask;
