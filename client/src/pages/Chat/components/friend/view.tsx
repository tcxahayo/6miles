import React from 'react';
import {Avatar} from 'antd';
import {IProps} from './index';
import './view.scss';

const Friends: React.FC<IProps> = (props) => {
  const { checked } = props;

  return (
    <div className={`chat_friend_container ${checked && 'chat_friend_container-checked'}`}>
      <Avatar
        shape="square"
        className="left"
        size="large"
        src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1898582417,1582081952&fm=26&gp=0.jpg"
      />
      <div className="right">
        <div className="info">
          <span className="name">It's me</span>
          <span className="time">19:30</span>
        </div>
        <span className="message">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span>
      </div>
    </div>
  )
}

export default Friends;
