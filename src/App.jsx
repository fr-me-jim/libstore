import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// store
import store from './store';
import { Provider } from 'react-redux';

// components
import Navbar from './components/layout/Navbar';

import Subscriptors from './components/subscriptors/Subscriptors';
import ShowSubs from './components/subscriptors/ShowSubs';
import NewSub from './components/subscriptors/NewSub';
import EditSub from './components/subscriptors/EditSub';

import Books from './components/books/Books';
import NewBook from './components/books/NewBook';
import ShowBook from './components/books/ShowBook';
import EditBook from './components/books/EditBook';
import BorrowBook from './components/books/BorrowBook';


function App() {
  return (
    <Provider store={store} >
      <Router>
        <Navbar />

        <div className="container">
          <Switch>
            <Route exact path="/" component={ Books } />
            <Route exact path="/books/new" component={ NewBook } />
            <Route exact path="/books/show/:id" component={ ShowBook } />
            <Route exact path="/books/edit/:id" component={ EditBook } />
            <Route exact path="/books/borrow/:id" component={ BorrowBook } />

            <Route exact path="/subs" component={ Subscriptors } />
            <Route exact path="/subs/new" component={ NewSub } />
            <Route exact path="/subs/edit/:id" component={ EditSub } />
            <Route exact path="/subs/show/:id" component={ ShowSubs } />

          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
