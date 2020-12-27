import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NotesIcon from '@material-ui/icons/Notes';
import InputAdornment from '@material-ui/core/InputAdornment';

// MYTODO: VALIDATION
// MYTODO: SMALLER SIZE
// MYTODO: USED AXIOS => POST (ADD)
function TodoForm({ addTodo }) {
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
    function onAddTodo() {
        if (todo.title) {
            addTodo(todo)
            // axios here
            setTodo({ ...todo, title: "", details: "" })

        }
        else {
            alert('empty!')
        }
    }
    function onEditTitle(e) {
        setTodo({ ...todo, title: e.target.value })
    }
    function onEditDetails(e) {
        setTodo({ ...todo, details: e.target.value })
    }
    function handleKeyUp(e) {
        if (e.key === 'Enter') {
            onAddTodo()
        }
    }
    return (
        <div className={classes.root}>
            <Paper component="form" className={classes.paper} variant="outlined">
                <Grid container justify="center" spacing={0}>
                    <Grid item xs={8}>
                        <Typography align="center" variant="h5"> Task ToDo</Typography>

                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <NotesIcon />
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
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