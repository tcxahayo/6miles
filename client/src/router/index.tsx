import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '@/pages/App';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import GoodsDetail from '@/pages/GoodsDetail'
import Release from '@/components/Release/view';
import OrderPage from '@/pages/OrderPage/view';
import Edit from '@/pages/Edit/view';
import Chat from '@/pages/Chat';

const AppRouters = () => {
  return (
    <Router>
      <Switch>
        <App>
          <Route path="/" exact component={Home} />
          <Route path="/profile" render={(props) => {
            console.log(props)
            return <Profile />;
          }} />
          <Route path="/GoodsDetail/:id" component={GoodsDetail} />
          <Route path="/release" component={Release} />
          <Route path="/orderPage/:id" component={OrderPage} />
          <Route path="/edit" component={Edit} />
          <Route path="/chat" component={Chat} />
        </App>
      </Switch>
    </Router>
  )
}

export default AppRouters;
