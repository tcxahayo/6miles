import React, { useState } from 'react';
import LoginComponent from './component/Login';
import RegisterComponent from './component/Register';
import './view.scss';

const Login: React.FC = () => {
  const [reverse, setReverse] = useState(false);

  return (
    <div className="login_container">
      <div className="content">
        <div className={`component LoginComponent ${reverse && 'LoginComponentReverse'}`}>
          <LoginComponent change={() => setReverse(!reverse)} />
        </div>
        <div className={`component RegisterComponent ${reverse && 'RegisterComponentReverse'}`}>
          <RegisterComponent change={() => setReverse(!reverse)} />
        </div>
      </div>
    </div>
  )
}

export default Login;
