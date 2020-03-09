import React, {useEffect} from 'react';
import Header from '@/components/Header';
import { getToken } from '@/lib/app';
import {getUserInfo} from '../../components/Login/api';
import {useDispatch} from 'react-redux';
import {actions} from '@/pages/App/store';
import renderRoute from '@/router';
import './view.scss';

// page
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import GoodsDetail from '@/pages/GoodsDetail'
import Release from '@/components/Release/view';
import OrderPage from '@/pages/OrderPage/view';
import Edit from '@/pages/Edit/view';
import Chat from '@/pages/Chat';

const routes = [{
  component: Home,
  path: '/',
  exact: true,
  isLogin: false
}, {
  component: Profile,
  path: '/profile',
  exact: false,
  isLogin: true
}, {
  component: GoodsDetail,
  path: '/GoodsDetail/:id',
  exact: false,
  isLogin: false
}, {
  component: Release,
  path: '/release',
  exact: false,
  isLogin: true
}, {
  component: OrderPage,
  path: '/orderPage/:id',
  exact: false,
  isLogin: true
}, {
  component: Edit,
  path: '/edit',
  exact: false,
  isLogin: true
}, {
  component: Chat,
  path: '/chat',
  exact: false,
  isLogin: true
}]

const App: React.FC = (props) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const token = getToken();
    if (token) {
      (async function() {
        const data = await getUserInfo();
        if (data) {
          dispatch(actions.setUserInfo(data));
        }
      })()
    }
  },[dispatch])

  return (
    <>
      <Header />
      <div className="main">
        {renderRoute(routes)}
      </div>
    </>
  )
}

export default App;
