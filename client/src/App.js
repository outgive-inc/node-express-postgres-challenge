import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import List from './screens/list';
import Item from './screens/item';

function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <Switch>
        <Route exact path="/" component={List} />
        <Route exact path="/detail" component={Item} />
      </Switch>
   </BrowserRouter>
  );
}

export default App;
