import React from "react";
import Home from "./container/Home/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewTask from "./container/NewTask";
import Details from "./container/Details";

import { ListProvider } from "./hooks/useListProvider";

function App() {
  return (
    <ListProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/new-task">
            <NewTask />
          </Route>
          <Route path="/task/:id">
            <Details />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ListProvider>
  );
}

export default App;
