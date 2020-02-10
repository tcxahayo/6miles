import React from 'react';
import './view.scss';
import bg2 from '../../imges/headimg.jpg';

const Login: React.FC = () => {
  return (
    <div className="c_login_container">
      <div className="content">
        <div className="bg1"></div>
        <div className="message">
          <div className="title">登录</div>
          <div className="mid">
            <label htmlFor="name" className="name">用户名:</label>
            <input type="text" id="name" />
            <label htmlFor="password">密码:</label>
            <input type="text" id="password" />
          </div>
          <div className="submit">确定</div>
          <div className="login">点击注册</div>
        </div>
      </div>
    </div>
  )
}

export default Login;
