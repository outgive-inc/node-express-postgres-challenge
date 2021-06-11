import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { makeStyles } from '@material-ui/core/styles';
import SearchInput from '../inputs/searchInput/searchInput';
import { IconButton, TextField, Tooltip, Button, Checkbox, Toolbar, Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    noTasksBox: {
        padding: "1em",
        textAlign: "center",
        color: "white",
        marginTop: "8em"
    },
    noTaskIcon: {
        color: "orange",
        fontSize: "7em"
    },
    tasksBox: {
        width: "60%",
        height: "70vh",
        margin: "0 auto",
        boxShadow: theme.shadows[5],
        minWidth: "500px"
    },
    tasksBoxHeader: {
        background: "#101940",
        padding: "1em",
        height: "2em",
        minHeight: "0px",
    },
    tasksBoxHeaderText: {
        marginTop: "0.6em",
        maxWidth: "525px",
        [theme.breakpoints.only('md')]: {
            maxWidth: "350px",
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: "150px",
        },
    },
    tasksBoxBody: {
        padding: "1em",
        background: "#101940",
        height: "100%",
        overflowY: "auto"
    },
    createButton: {
        background: "green",
        color: "white",
        "&:hover": {
            background: "green",
        },
        padding: "0.5em 1em 0.5em 1em",
        boxShadow: theme.shadows[3],
    },
    saveButton: {
        background: "#1e88e5",
        color: "white",
        "&:hover": {
            background: "#1e88e5",
        },
        marginRight: "10px",
        padding: "0.2em 1em 0.2em 1em",
        boxShadow: theme.shadows[3],
    },
    deleteButton: {
        background: "red",
        color: "white",
        padding: "8px",
        boxShadow: theme.shadows[3],
        "&:hover": {
            background: "red",
        },
    },
    editButton: {
        background: "#1e88e5",
        color: "white",
        padding: "8px",
        boxShadow: theme.shadows[3],
        marginRight: "10px",
        "&:hover": {
            background: "#1e88e5",
        },
    },
    completedBox: {
        color: "green",
        '&$checked': {
            color: "green",
        },
    },
    editTitleField: {
        marginTop: "0.4em",
        width: "calc(100% - 15em)",
        minWidth: "10em"
    },
    editDetailsField: {
        width: "100%"
    }
}));

export default function Tasks() {
    const classes = useStyles()

    const [loaded, setLoaded] = useState(false);

    //Search key for finding a certain task
    const [searchKey, setSearchKey] = useState("");

    //All tasks
    const [tasks, setTasks] = useState([])

    //Get API endpoint from global context
    const { apiEndpoint } = useContext(GlobalContext);

    //Fetch all tasks when component is loaded
    useEffect(() => {

        getAllTasks().then((tasks) => {
            setTasks(tasks)
            setLoaded(true)
        }).catch((err) => { console.log(err) })

    }, [])

    async function getAllTasks() {
        let response = await fetch(`${apiEndpoint}/v1/tasks/getall`, {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        });

        if (response.status !== 200) {
            throw new Error("Failed getting all tasks");
        }

        const res = await response.json();

        return res
    }

    function expandTask(id) {

        const tasksCopy = [...tasks]

        const task = tasksCopy.find(t => t.id === id)

        if (task.editMode) {
            task.expanded = true;
        } else {
            task.expanded = !task.expanded;
        }

        setTasks(tasksCopy)
    }

    async function addTask() {

        let response = await fetch(`${apiEndpoint}/v1/tasks/create`, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: `Template ${tasks.length + 1}` })
        });

        const res = await response.json();

        if (response.status !== 200) {
            toast.error(res.errorMessage)
            return
        }

        const tasksCopy = [...tasks]

        tasksCopy.unshift({
            id: res.id,
            title: res.title,
            details: res.details,
            completed: res.completed,
            editMode: true,
            expanded: true
        })

        setTasks(tasksCopy)
    }

    function editTask(event, id) {
        event.stopPropagation();

        const tasksCopy = [...tasks]

        const task = tasksCopy.find(t => t.id === id)

        task.editMode = true;
        task.expanded = true;

        setTasks(tasksCopy)
    }

    async function saveChanges(event, id) {
        event.stopPropagation();

        const tasksCopy = [...tasks]

        const task = tasksCopy.find(t => t.id === id);

        if (task.title.length > 100) {
            toast.error("Title cannot exceed 100 characters")
            return
        } else if (task.title.length <= 0) {
            toast.error("Title cannot be empty")
            return
        }

        let response = await fetch(`${apiEndpoint}/v1/tasks/update`, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });

        if (response.status !== 200) {
            const res = await response.json();

            toast.error(res.errorMessage)
            return
        }

        task.editMode = false;

        setTasks(tasksCopy)
    }

    async function deleteTask(event, id) {
        event.stopPropagation();

        let response = await fetch(`${apiEndpoint}/v1/tasks/delete/${id}`, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        });

        if (response.status !== 200) {
            const res = await response.json();

            toast.error(res.errorMessage)
            return
        }

        let tasksCopy = [...tasks]

        tasksCopy = tasksCopy.filter(t => t.id !== id);

        setTasks(tasksCopy)
    }

    async function updateTaskStatus(event, id) {
        event.stopPropagation();

        const tasksCopy = [...tasks]

        const task = tasksCopy.find(t => t.id === id)

        task.completed = !task.completed;

        let response = await fetch(`${apiEndpoint}/v1/tasks/update`, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });

        if (response.status !== 200) {
            const res = await response.json();

            toast.error(res.errorMesssage)
            return
        }

        setTasks(tasksCopy)
    }

    return (
        <div className={classes.tasksBox}>
            {tasks.length > 0 ?
                <Toolbar className={classes.tasksBoxHeader}>
                    <SearchInput onKeyUp={(words) => { setSearchKey(words); }} />
                    <div className={classes.grow} />
                    <Button onClick={addTask} endIcon={<AddTwoToneIcon />} className={classes.createButton}>
                        Add Task
                    </Button>
                </Toolbar>
                :
                null
            }
            <div className={classes.tasksBoxBody}>
                {tasks.length === 0 && loaded ?
                    <div className={classes.noTasksBox}>
                        <InfoTwoToneIcon className={classes.noTaskIcon} />
                        <h2>No Tasks Found</h2>
                        <br />
                        <Button onClick={addTask} endIcon={<AddTwoToneIcon />} className={classes.createButton}>
                            Add Task
                        </Button>
                    </div>
                    :
                    <div>
                        {tasks.map((task) => {
                            if (searchKey !== "" && !task.title.toUpperCase().includes(searchKey.toUpperCase())) {
                                return null
                            }


                            return (
                                <Accordion
                                    expanded={task.expanded ?? false}
                                    key={task.id}
                                >
                                    <AccordionSummary
                                        onClick={() => { expandTask(task.id) }}
                                    >
                                        <Checkbox
                                            onClick={(e) => { updateTaskStatus(e, task.id) }}
                                            className={classes.completedBox}
                                            color="default"
                                            checked={task.completed}
                                        />
                                        {task.editMode ?
                                            <TextField
                                                onKeyUp={(e) => { task.title = e.target.value; }}
                                                defaultValue={task.title}
                                                onClick={(e) => { e.stopPropagation() }}
                                                className={classes.editTitleField}
                                            />
                                            :
                                            <Typography noWrap className={classes.tasksBoxHeaderText}>{task.title}</Typography>
                                        }
                                        <div className={classes.grow} />
                                        {task.editMode ?
                                            <div>
                                                <Button onClick={(e) => { saveChanges(e, task.id) }} endIcon={<SaveTwoToneIcon />} className={classes.saveButton}>
                                                    Save
                                                </Button>
                                                <Tooltip title="Delete Task">
                                                    <IconButton onClick={(e) => { deleteTask(e, task.id); }} className={classes.deleteButton}>
                                                        <DeleteTwoToneIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>

                                            :
                                            <div>
                                                <Tooltip title="Edit Task">
                                                    <IconButton onClick={(e) => { editTask(e, task.id); }} className={classes.editButton}>
                                                        <EditTwoToneIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete Task">
                                                    <IconButton onClick={(e) => { deleteTask(e, task.id); }} className={classes.deleteButton}>
                                                        <DeleteTwoToneIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        }
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {task.editMode ?
                                            <TextField
                                                onKeyUp={(e) => { task.details = e.target.value; }}
                                                defaultValue={task.details}
                                                className={classes.editDetailsField}
                                                multiline
                                            />
                                            :
                                            <Typography>{task.details}</Typography>
                                        }
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    );
}
