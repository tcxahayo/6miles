import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '@/pages/App';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import GoodsDetail from '@/pages/GoodsDetail'
import Release from '@/components/Release/view';
import OrderPage from '@/pages/OrderPage/view';
import Edit from '@/pages/Edit/view'

const AppRouters = () => {
  return (
    <Router>
      <Switch>
        <App>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/GoodsDetail/:id" component={GoodsDetail} />
          <Route path="/release" component={Release} />
          <Route path="/orderPage/:id" component={OrderPage} />
          <Route path="/edit" component={Edit} />
        </App>
      </Switch>
    </Router>
  )
}

export default AppRouters;
