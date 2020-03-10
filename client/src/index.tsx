import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './store';
import renderRouter, {IRoute} from '@/router';
import App from '@/pages/App';
import Login from '@/pages/Login';
import '@/style/iconfont.scss';
import './index.scss';

// 组件根路由
const rootRouter: IRoute[] = [{
  component: Login,
  path: '/login',
  exact: false,
  isLogin: false
}, {
  component: App,
  path: '/',
  exact: false,
  isLogin: false
}]

// css热更新
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <Switch>
            {renderRouter(rootRouter)}
          </Switch>
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

render();

declare const module: any;
if (module.hot) {
  module.hot.accept('@/router/', () => {
    render();
  });
}
