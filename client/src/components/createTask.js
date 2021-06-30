import React, { Fragment, useState, useContext } from "react";
import { Context } from "../store/taskStore";
import { getAllTask, createTask } from "../services/taskService";
import { validateTask } from "../services/taskValidation";

const CreateTask = () => {
    const [, dispatch] = useContext(Context);
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [showModal, setModal] = useState(false);
    const [msg, setMsg] = useState("");
    const toggleModal = () => {
        setModal(!showModal);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const body = { title, details };
        // execute validation here

        const result = await validateTask(body);

        if (result.isValid) {
            try {
                const response = await createTask(body);
                if (response) {
                    const allTask = await getAllTask();
                    if (allTask) {
                        dispatch({ type: "SET_TASK_LIST", payload: allTask });
                        setTitle("");
                        setDetails("");
                    }
                }
            } catch (err) {
                console.error(err.message);
            }
        } else {
            setMsg(result.message);
            toggleModal();
        }
    };
    return (
        <Fragment>
            <div className="container">
                <h1 className="text-center mt-5">Task App</h1>
                <form className="d-flex mt-5">
                    <input
                        className="form-control m-1"
                        placeholder="Enter Title for task"
                        type="text"
                        maxLength="20"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <input
                        className="form-control m-1"
                        placeholder="Enter Details of task"
                        type="text"
                        maxLength="255"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    ></input>
                    <button
                        className="btn btn-primary m-1"
                        onClick={(e) => onSubmitForm(e)}
                    >
                        Create Task
                    </button>
                </form>
                {showModal ? (
                    <div>
                        <div>{msg}</div>
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={toggleModal}
                        >
                            OK
                        </button>
                    </div>
                ) : null}
            </div>
        </Fragment>
    );
};

export default CreateTask;
