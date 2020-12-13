import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import List from './screens/list';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={List} />
      </Switch>
   </BrowserRouter>
  );
}

export default App;
