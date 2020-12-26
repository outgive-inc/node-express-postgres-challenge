import React, {useState} from "react"

import Grid from '@material-ui/core/Grid';
import TodoFormDelo from './components/TodoFormDelo'
import TodoDelo from './components/TodoDelo'
function App() {
  const [todos, setTodos] = useState([])
  function addTodo(todo) {
    setTodos([todo, ...todos])
    console.log(todo)
  }
  return(
    <Grid container justify = "center">
      
      <TodoFormDelo addTodo={addTodo}/>
        {todos.map((todo, i) => {
          return <TodoDelo todo={todo} key={i}/>
        })}
    </Grid>
  )
}

export default App
