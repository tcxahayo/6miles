import React from 'react';
import './view.scss';
import bg1 from '../../imges/article1.jpg';
import {
  Form,
  Input
} from 'antd';

const template: React.FC = () => {
  return (
    <div className="c_register_container">
      <div className="content">
        <div className="bg1"></div>
        <div className="message">
          <div className="title">欢迎来到6miles的世界</div>
          <div className="mid">
            <label htmlFor="name" className="name">用户名:</label>
            <input type="text" id="name" />
            <label htmlFor="password">密码:</label>
            <input type="text" id="password" />
            <label htmlFor="phone">电话号码:</label>
            <input type="text" id="phone" />
            <label htmlFor="code">验证码:</label>
            <input type="text" id="code" />
            <div className="send">获取</div>
          </div>
          <div className="submit">确定</div>
          <div className="login">已有账号，登录</div>
        </div>
      </div>
    </div>
  )
}

export default template;
