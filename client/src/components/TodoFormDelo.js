// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import InputBase from '@material-ui/core/InputBase';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import DirectionsIcon from '@material-ui/icons/Directions';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: '2px 4px',
//     display: 'flex',
//     alignItems: 'center',
//     width: 400,
//   },
//   input: {
//     marginLeft: theme.spacing(1),
//     flex: 1,
//   },
//   iconButton: {
//     padding: 10,
//   },
//   divider: {
//     height: 28,
//     margin: 4,
//   },
// }));

// export default function CustomizedInputBase() {
//   const classes = useStyles();

//   return (
//     <Paper component="form" className={classes.root}>
//       <IconButton className={classes.iconButton} aria-label="menu">
//         <MenuIcon />
//       </IconButton>
//       <InputBase
//         className={classes.input}
//         placeholder="Task"
//         inputProps={{ 'aria-label': 'search google maps' }}
//         helperText="Enter to add todo"
//       />
//       <IconButton type="submit" className={classes.iconButton} aria-label="search">
//         <SearchIcon />
//       </IconButton>
//       <Divider className={classes.divider} orientation="vertical" />
//       <IconButton color="primary" className={classes.iconButton} aria-label="directions">
//         <DirectionsIcon />
//       </IconButton>
//     </Paper>
//   );
// }


import React, {useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function TodoFormDelo({addTodo}) {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
            margin: theme.spacing(1),
            },
        },
    }));
    const classes = useStyles();
    const [todo, setTodo] = useState({
        task: "",
        details: "",
        completed: false
    })
    function onAddTodo() {
        addTodo(todo)
        setTodo({...todo, task: "", details: ""})
    }
    function onEditTask(e) {
        setTodo({...todo, task: e.target.value})
    }
    function onEditDetails(e) {
        setTodo({...todo, details: e.target.value})
    }
    function handleKeyUp(e){
        if(e.key === 'Enter'){
            onAddTodo()
        }
    }
    return (
        <div >
            <Paper component="form" className={classes.root}>
                <TextField 
                onChange={onEditTask} 
                onKeyUp={handleKeyUp} 
                value={todo.task} 
                helperText="Enter to add todo"
                label="Task" variant="outlined"/>
                <TextField 
                onChange={onEditDetails} 
                onKeyUp={handleKeyUp} 
                value={todo.details} 
                label="Details" variant="outlined"/>
                <Button onClick={onAddTodo} size="large" variant="contained" color="primary">
                    Add
                </Button>
            </Paper>
        </div>
    )
}

export default TodoFormDelo