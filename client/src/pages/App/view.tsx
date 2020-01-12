import React from 'react';
import Header from '@/components/Header';
import './view.scss';

const App: React.FC = (props) => {
  return (
    <>
      <Header />
      <div className="main">
        {props.children}
      </div>
    </>
  )
}

export default App;
