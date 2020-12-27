import React from 'react'
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
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        //   maxWidth: 360,
        //   backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(0),
        margin: 'auto',
        maxWidth: 680,
    },
   
}));


function TodoList({ todos }) {
    const classes = useStyles();

    // const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = todos.indexOf(value);
        console.log('handleToggle', currentIndex)

    };
    return (
        <Paper component="form" className={classes.paper} variant="outlined">
            {todos.map((todo, i) => {
                // if (i !== 1) {
                return (
                    <List key={i} >
                        <ListItem width={1} role={undefined} dense button onClick={handleToggle(todo)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={todo.completed}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': todo.title }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={todo.title} secondary={todo.details} />
                            <ListItemSecondaryAction>
                                {/* <EditIcon /> */}
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        {(i!=todos.length-1
                            ? <Divider light />
                            : <div></div>
                        )}
                    </List>
                )
                // } else {
                //     return (
                //         <List key={i}>2nd item</List>
                //     )
                // }

            })}
        </Paper>
    )
}

export default TodoList

// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import Todo from './Todo'
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';



// function TodoList({ todos }) {
//     const useStyles = makeStyles((theme) => ({
//         root: {
//             '& > *': {
//                 margin: theme.spacing(2),
//                 // maxWidth:500
//             },

//         },
//         paper: {
//             padding: theme.spacing(0),
//             margin: 'auto',
//             maxWidth: 680,
//         }

//     }));
//     const classes = useStyles();
//     return (
//         // <div className={classes.root}>
//             <Paper component="form" className={classes.paper} variant="outlined">
//             <Grid item  className={classes.paper}>
//                 {todos.map((todo, i) => {
//                 return <Todo todo={todo} key={i}/>
//                 })}
//             </Grid>
//             </Paper>
//         // {/* </div> */}
//     )
// }

// export default TodoList