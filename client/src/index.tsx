import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './store';
import AppRouter from '@/router';
import im from '@/lib/Im';
import '@/style/iconfont.scss';
import './index.scss';
// css热更新
const render = (Component: React.FC) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

render(AppRouter);

declare const module: any;
if (module.hot) {
  module.hot.accept('@/router/', () => {
    render(AppRouter);
  });
}
