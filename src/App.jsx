import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// components
import Navbar from './components/layout/Navbar';

import Subscriptors from './components/subscriptors/Subscriptors';
import ShowSubs from './components/subscriptors/ShowSubs';
import NewSub from './components/subscriptors/NewSub';
import EditSub from './components/subscriptors/EditSub';


function App() {
  return (
    <Router>
      <Navbar />

      <div className="container">
        <Switch>
          <Route exact path="/subs" component={ Subscriptors } />
          <Route exact path="/subs/new" component={ NewSub } />
          <Route exact path="/subs/edit/:id" component={ EditSub } />
          <Route exact path="/subs/show/:id" component={ ShowSubs } />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
