import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '@/pages/App';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';

const AppRouters = () => {
  return (
    <Router>
      <Switch>
        <App>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
        </App>
      </Switch>
    </Router>
  )
}

export default AppRouters;
