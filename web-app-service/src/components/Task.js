import React from "react";
import axios from "axios";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { ImRadioUnchecked } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Task({ task, getTasks }) {
    const navigate = useNavigate();

    const taskCompleted = () => {
        console.log("taskCompleted", task);
        axios.get(`http://localhost:5000/toggle-completed-status/${task.id}`)
            .then((response) => {
                console.log(response);
                getTasks();
            })
            .catch((error) => {
                console.log(error);
            });
        navigate("/");
    };

    return (
        <div
            className="task-card"
        >
            <p
                onClick={() => {
                    navigate(`/task-details/${task.id}`);
                }}
                className="task-heading"
            >
                {task.title}
            </p>
            <span className="task-check">
                {task.iscompleted === false ? (
                    <>
                        <ImRadioUnchecked
                            className="task-check-icon"
                            onClick={() => taskCompleted(task.id)}
                        />
                    </>
                ) : (
                    <>
                        <IoIosCheckmarkCircle
                            className="task-check-icon"
                            onClick={() => taskCompleted(task.id)}
                        />
                    </>
                )}
            </span>
        </div >
    );
}