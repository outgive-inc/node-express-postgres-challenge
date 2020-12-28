import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AssignmentReturnedOutlinedIcon from '@material-ui/icons/AssignmentReturnedOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';

function TodoForm({ addTodo, defaultTodo }) {
    const useStyles = makeStyles((theme) => ({
        root: {
            margin: theme.spacing(0)
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 650,
        }

    }));
    const classes = useStyles();
    const [todo, setTodo] = useState({
        title: "",
        details: "",
        completed: false
    })
    useEffect(() => {
        setTodo(defaultTodo)
        document.getElementById("title").focus()
    }, [defaultTodo])
    const onAddTodo = () =>{
        if (todo.title.trim() && todo.title.length > 1) {
            addTodo(todo)
            setTodo({ ...todo, title: "", details: "" })
        }
        else {
            alert('Provide valid title of task!')
        }
    }
    const onEditTitle = (e) => {
        setTodo({ ...todo, title: e.target.value })
    }
    const onEditDetails = (e) => {
        setTodo({ ...todo, details: e.target.value })
        
    }
    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            onAddTodo()
            document.getElementById("title").focus()
        }
    }
    return (
        <div className={classes.root}>
            <Paper component="form" className={classes.paper} variant="outlined">
                <Grid container justify="center" spacing={1}>
                    <Grid item xs={8}>
                        <Typography align="center" variant="h5"> Outgive ToDo</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            autoFocus
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AssignmentReturnedOutlinedIcon color="action"/>
                                    </InputAdornment>
                                ),
                            }}
                            id="title"
                            onChange={onEditTitle}
                            onKeyUp={handleKeyUp}
                            value={todo.title}
                            label="What needs to be done?" variant="outlined" />

                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            onChange={onEditDetails}
                            onKeyUp={handleKeyUp}
                            value={todo.details}
                            label="Details" size="small" />

                    </Grid>
                    <Grid item xs={10}>
                        
                    </Grid>
                    
                </Grid>
            </Paper>
        </div>
    )
}

export default TodoForm