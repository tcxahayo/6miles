import React from 'react';
import Header from '@/components/Header';
import Register from '@/components/Register';
import Login from '@/components/Login'
import './view.scss';

const App: React.FC = (props) => {
  return (
    <>
      <Header />
      {/* <Register /> */}
      {/* <Login /> */}
      <div className="main">
        {props.children}
      </div>
    </>
  )
}

export default App;
