import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import TaskDetailPage from "./routes/TaskDetailPage";
import { TasksContextProvider } from "./context/TasksContext";
const App = () => {
  return (
    <TasksContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/tasks/:id/update"
              component={UpdatePage}
            />
            <Route
              exact
              path="/tasks/:id"
              component={TaskDetailPage}
            />
          </Switch>
        </Router>
      </div>
    </TasksContextProvider>
  );
};

export default App;
