import React, {useState, useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Paper from '@material-ui/core/Paper';
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { axios } from './axios'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
  headers: {
    padding: '30px',   
  }
  
}));

function App() {
  const [filteredBy, setFilteredBy] = React.useState('');

  const [todos, setTodos] = useState([])
  const [defaultTodo, setDefaultTodo] = useState({
    title: "",
    details: "",
    completed: false
  })
  const getTodos = () => {
    axios.get('/tasks').then(res => {
      setTodos(res.data)
    })
  }

  useEffect(() => {
    getTodos()
  }, [])

  const updateTodoDb = (todo) => {
    axios.put(`/task/${todo.id}`, todo).then(() => {
      let i = todos.indexOf(todos.filter(el => el.id === todo.id)[0])
      let updatedTodos = [...todos]
      updatedTodos[i] = todo
      setTodos(updatedTodos)
    })
  }

  const addTodo = (todo) => {
    if(todo.title.trim()){
      if(todo.id){
        // update
        updateTodoDb(todo)
      }else{
        // add
        axios.post('/task', todo).then(res => {
          todo.id = res.data.id
          setTodos([todo, ...todos])
        })
      }
      
    }
  }

  const toggleTodo = (todo) =>{
    axios.put(`/task/${todo.id}`, todo).then(() => {
      updateTodoDb(todo)
    })
  }

  const updateTodo = (todo) =>{
    setDefaultTodo(todo)
  }

  const deleteTodo = (todo) =>{
    axios.delete(`/task/${todo.id}`).then(() => {
      let i = todos.indexOf(todo)
      let updatedTodos = [...todos]
      updatedTodos.splice(i, 1)
      setTodos(updatedTodos)
    })
  }

  const handleFilteredBy = (_, newFilteredBy) => {
    setFilteredBy(newFilteredBy)
  }
  
  const classes = useStyles();
  return(
    <Grid bgcolor="primary" container justify="center" spacing={3}>
      <Grid item xs={8}>
        <TodoForm className={classes.headers} addTodo={addTodo} defaultTodo={defaultTodo}/>
        <TodoList todos={todos} filteredBy={filteredBy} toggleTodo={toggleTodo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
        <Paper component="form" className={classes.paper} variant="outlined">
          <Grid container  spacing={0}>
            <Typography variant="subtitle1" gutterBottom className={classes.title}> {todos.filter(el => !el.completed).length} left todo </Typography>
            <ToggleButtonGroup onChange={handleFilteredBy} exclusive value={filteredBy} variant="text" className={classes.filters} color="primary" aria-label="text secondary button group">
                <ToggleButton value="">All</ToggleButton>
                <ToggleButton value="false">Active</ToggleButton>
                <ToggleButton value="true">Completed</ToggleButton>
            </ToggleButtonGroup> 
          </Grid>
        </Paper>
      </Grid>      
    </Grid>
  )
}

export default App
