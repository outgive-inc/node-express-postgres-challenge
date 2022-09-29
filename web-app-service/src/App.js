import React, { useEffect, useState } from 'react';
import axios from "axios";
import { IoAddCircleOutline } from "react-icons/io5";
import "./App.css";
import Task from "./components/Task";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

function App() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const getTasks = () => {
        axios.get("http://localhost:5000/tasks").then((response) => {
            const completedTasks = response.data.filter((task) => task.iscompleted === true);
            setCompletedTasks(completedTasks);
            const tasks = response.data.filter((task) => task.iscompleted === false);
            setTasks(tasks);
        });
    }
    const addTask = async () => {
        if (title === "" || details === "") {
            alert("Please fill all the fields")
        }
        else {
            axios.post("http://localhost:5000/create-task", {
                title: title,
                details: details,
            })
                .then((response) => {
                    setTitle("");
                    setDetails("");
                    handleClose();
                    getTasks();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="wrapper">
            <div className="main-div">
                <div className="tasks-header">
                    <div>
                        <h3 className="main-heading">Task</h3>
                    </div>

                    <div>
                        <div className="add-task-btn" onClick={handleOpen}>
                            <IoAddCircleOutline className="add-task-icon" />
                        </div>
                    </div>
                </div>
                <div className='mid-div'>
                    {tasks.map((task) => (
                        <Task key={task.id} task={task} getTasks={getTasks} />
                    ))}
                </div>
                <h3 className="main-heading">Completed</h3>
                <div className='mid-div'>
                    {completedTasks.map((task) => (
                        <Task key={task.id} task={task} getTasks={getTasks} />
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
                        <TextField fullWidth id="outlined-basic" value={details} onChange={(e) => { setDetails(e.target.value) }} label="Task Details" placeholder='Enter Task Details' variant="outlined" margin='normal' />
                        <Button onClick={addTask} sx={button} variant="outlined">Add Task</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default App;
