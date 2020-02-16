import React from 'react';
import Header from '@/components/Header';
import Register from '@/components/Register';
import Login from '@/components/Login';
import {useSelector} from 'react-redux';
import {State} from '@/store';
import './view.scss';

const App: React.FC = (props) => {
  const {loginModal, registerModal} = useSelector((state: State) => state.app);
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
