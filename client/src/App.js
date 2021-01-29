import React from "react";

//Import Styles
import "./App.css";

//Import Components
import TaskList from "./components/TaskList";
import Nav from "./components/Nav";
import TaskContextProvider from "./contexts/TaskContext";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <TaskContextProvider>
      <div className="container">
        <div className="app">
          <Nav />
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </TaskContextProvider>
  );
}

export default App;
