import React, { Fragment } from "react";
import EditTask from "./EditTask";
import CreateSubTask from "./CreateSubTask";
import ListSubTasks from "./ListSubTasks";

const ViewDetails = ({ task }) => {

    return (
        <Fragment>
            {/* Button for opening the modal */}
            <span data-toggle="tooltip">
                <button type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target={`#id${task.taskId}`}
                    data-placement="top"
                    title="View/Edit Details">
                    <i className="fa fa-eye"></i>
                </button>
            </span>

            {/* The view details modal */}
            <div className="modal" id={`id${task.taskId}`}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">View/Edit Details</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">

                            <div id="accordion">
                                <div className="card">
                                    <div className="card-header" id="headingOne">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link" data-toggle="collapse" data-target={`#collapseOne${task.taskId}`} aria-expanded="true" aria-controls="collapseOne">
                                                Details
                                            </button>
                                        </h5>
                                    </div>

                                    <div id={`collapseOne${task.taskId}`} className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div className="card-body">
                                            <EditTask task={task} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingTwo">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" data-toggle="collapse" data-target={`#collapseTwo${task.taskId}`} aria-expanded="false" aria-controls="collapseTwo">
                                                SubTasks
                                            </button>
                                        </h5>
                                    </div>
                                    <div id={`collapseTwo${task.taskId}`} className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                        <div className="card-body">
                                            <CreateSubTask task={task} />
                                            <ListSubTasks task={task} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ViewDetails;