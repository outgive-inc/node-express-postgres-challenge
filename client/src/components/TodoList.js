import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        padding: theme.spacing(0),
        margin: 'auto',
        maxWidth: 680,
    },
}));

function TodoList({ todos, filteredBy, toggleTodo, updateTodo, deleteTodo }) {
    const classes = useStyles();
    const [showIndex, setShowIndex] = useState(-1)
    const handleShow = (val) => () => {
        setShowIndex(val)
    }
    const handleToggle = (value) => () => {
        const i = todos.indexOf(value);
        let updatedTodo = todos[i]
        updatedTodo.completed = !updatedTodo.completed
        setTimeout(() => {
            setShowIndex(-1)
        }, 2 * 1000);
        toggleTodo(updatedTodo)
    };
    const handleDelete = (value) => () => {
        deleteTodo(value)
    }
    const handleEdit = (value) => () => {
        updateTodo(value)
    }
    return (
        <Paper component="form" className={classes.paper} variant="outlined">
            {todos.filter(el => {
                if(filteredBy === 'true'){
                    return el.completed
                }else if(filteredBy === 'false'){
                    return !el.completed
                }else{
                    return true
                }
            }).map((todo, i) => {
                if(showIndex === i){
                    return (
                        <List key={todo.id} >
                            <ListItem selected width={1} role={undefined} dense button  onClick={handleShow(i)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={todo.completed}
                                        onClick={handleToggle(todo)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': todo.title }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={todo.title}/>
                                <ListItemSecondaryAction>
                                    <IconButton onClick={handleDelete(todo)} edge="end" aria-label="delete">
                                        <DeleteIcon color="action"/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem selected width={1} role={undefined} dense button>
                                <ListItemIcon>
                                    <IconButton size="small" onClick={handleShow(-1)} edge="end" aria-label="delete">
                                        <CloseIcon color="action"/>
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText secondary={todo.details? todo.details: 'No details provided.'}/>
                                <ListItemSecondaryAction>
                                    <IconButton size="small" onClick={handleEdit(todo)} edge="end" aria-label="delete">
                                        <EditIcon color="action"/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            {(i!==todos.length-1
                                ? <Divider light />
                                : <div></div>
                            )}
                        </List>
                    )
                }else{
                    return (
                        <List key={todo.id} >
                            <ListItem width={1} role={undefined} dense button  onClick={handleShow(i)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={todo.completed}
                                        onClick={handleToggle(todo)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': todo.title }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={todo.title}/>
                                <ListItemSecondaryAction>
                                    <IconButton onClick={handleDelete(todo)} edge="end" aria-label="delete">
                                        <DeleteIcon color="action"/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            {(i!==todos.length-1
                                ? <Divider light />
                                : <div></div>
                            )}
                        </List>
                    )
                }
                

            })}
        </Paper>
    )
}

export default TodoList
