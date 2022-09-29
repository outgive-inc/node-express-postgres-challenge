import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import moment from "moment";

import "../App.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const button = {
    width: '100%',
    marginTop: '10px',
};


export default function TaskDetails() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState("");
    const [task, setTask] = useState({});
    const [subTasks, setSubTasks] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const getTaskData = () => {
        axios.get(`http://localhost:5000/task/${id}`)
            .then((response) => {
                setTask(response.data.task);
                setSubTasks(response.data.subTasks);
            })
            .catch((error) => {
                console.log({ message: error.message });
            });
    };
    const deleteTask = () => {
        axios.delete(`http://localhost:5000/delete-task/${id}`)

            .then((response) => {
                console.log(response);
                navigate("/");
            })
            .catch((error) => {
                console.log({ message: error.message });
            });
    };
    const addSubTask = async () => {
        if (title === "") {
            alert("Please fill all the fields")
        }
        else {
            axios.post(`http://localhost:5000/create-subtask/${id}`, {
                title: title,
            })
                .then((response) => {
                    setTitle("");
                    handleClose();
                    getTaskData();
                })
                .catch((error) => {
                    console.log({ message: error.message });
                });
        }
    }
    const handleSubtaskDelete = (id) => {
        axios.delete(`http://localhost:5000/delete-subtask/${id}`)

            .then((response) => {
                console.log(response);
                getTaskData();
            })
            .catch((error) => {
                console.log({ message: error.message });
            });
    };
    const handleSubtaskToggle = (subtaskId) => {
        axios.get(`http://localhost:5000/toggle-subtask-status/${subtaskId}`)
            .then((response) => {
                getTaskData();
            })
            .catch((error) => {
                console.log({ message: error.message });
            });
    }
    useEffect(() => {
        getTaskData();
    }, []);

    return (
        <div className="task-details">
            <div className="task-main">
                <div className="task-actions">
                    <div className="task-actions-icon">
                        <MdDelete
                            onClick={() => {
                                deleteTask(id);
                            }}
                        />
                    </div>
                </div>
                <div className="task-sub-details">
                    <small className="text-muted px-1">{moment(task.createdat).fromNow()}</small>
                </div>
                <h2>
                    {task.title}
                </h2>
                <p>
                    {task.details}
                </p>
                <div className="add-sub-task">
                    <div onClick={handleOpen} className="add-sub-task-button">
                        Add Sub Task
                    </div>
                </div>
                <div className="sub-tasks">
                    <h3>Sub Tasks</h3>
                    {subTasks.map((subTask) => (
                        <div className="sub-task">
                            <input type="checkbox"
                                checked={subTask.iscompleted}
                                onChange={() => { handleSubtaskToggle(subTask.id) }}
                            />
                            <p>{subTask.title}</p>
                            <MdDelete
                                className="delete-subtask-icon"
                                onClick={() => {
                                    handleSubtaskDelete(subTask.id);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Task
                    </Typography>
                    <div className='addtask-field'>
                        <TextField fullWidth id="outlined-basic" value={title} onChange={(e) => { setTitle(e.target.value) }} label="Task Title" placeholder='Enter Task Title' variant="outlined" margin="normal" />
                        <Button onClick={addSubTask} sx={button} variant="outlined">Add Task</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}