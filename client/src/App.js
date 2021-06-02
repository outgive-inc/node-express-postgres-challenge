import TodoList from "./components/TodoList";
import "./index.css";
import { Switch, Route } from "react-router-dom";
import Todo from "./components/Todo";

function App() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center my-3">Todo App</h1>
      <Switch>
        <Route exact path="/" component={TodoList} />
        <Route exact path="/todos/:id" component={Todo} />
      </Switch>
    </div>
  );
}

export default App;
