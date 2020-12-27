import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        //   maxWidth: 360,
        //   backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: 668,
    },
    title: {
        flexGrow: 1,
        
    },
    filters: {
        float:'right'
    },
    
}));


const ToDoFooter = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper component="form" className={classes.paper} variant="outlined">
                <Grid container  spacing={0}>
                    <Typography className={classes.title}> 3 items left </Typography>
                        <ButtonGroup className={classes.filters} color="primary" aria-label="outlined secondary button group">
                            <Button>All</Button>
                            <Button>Active</Button>
                            <Button>Completed</Button>
                        </ButtonGroup> 
                
                </Grid>
            </Paper>
              
        </div>

    )

}


export default ToDoFooter