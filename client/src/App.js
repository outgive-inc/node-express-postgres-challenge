import React, { Fragment } from "react";
import "./App.css";


import TodoList from "./components/TodoList";

function App() {
  return (
    <Fragment>
      <div className="container">
        <TodoList />
      </div>
    </Fragment>
  );
}

export default App;