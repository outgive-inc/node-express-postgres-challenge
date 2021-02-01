import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./app.css";
import store from "./store";
import { Provider } from "react-redux";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import createTask from "./components/tasks/CreateTask";
import editUser from "./components/tasks/EditTask";
import user from "./components/tasks/Task";

function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tasks/create" component={createTask} />
            <Route exact path="/tasks/update/:id" component={editUser} />
            <Route exact path="/tasks/:id" component={user} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
