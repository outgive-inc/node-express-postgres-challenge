import TodoList from "./components/TodoList";
import "./index.css";

function App() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center my-3">Todo App</h1>
      <TodoList />
    </div>
  );
}

export default App;
