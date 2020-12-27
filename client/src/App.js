import React, {useState} from "react"
import Grid from '@material-ui/core/Grid';
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'

import { Button } from "@material-ui/core";

function App() {
  const [todos, setTodos] = useState([])
  function addTodo(todo) {
    setTodos([todo, ...todos])
  }
  function seeTodos(){
    console.log(todos)
  }
  return(
    <Grid container justify="center" spacing={3}>
      <Grid item xs={8}>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} />
        <TodoFooter></TodoFooter>
      </Grid>
  
      <Grid item xs={8}>
        <Button onClick={seeTodos}>console todos</Button>
      </Grid>
      
    </Grid>
  )
}

export default App
