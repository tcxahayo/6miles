import React, {useEffect} from 'react';
import Header from '@/components/Header';
import Register from '@/components/Register';
import Login from '@/components/Login';
import { useSelector } from 'react-redux';
import { State } from '@/store';
import './view.scss';
import { getToken } from '@/lib/app';
import {getUserInfo} from '../../components/Login/api';
import {useDispatch} from 'react-redux';
import {actions} from '@/pages/App/store';


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

  const { loginModal, registerModal } = useSelector((state: State) => state.app);
  return (
    <>
      <Header />
      {loginModal && <Login />}
      {registerModal && <Register />}
      <div className="main">
        {props.children}
      </div>
    </>
  )
}

export default App;
