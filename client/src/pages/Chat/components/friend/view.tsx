import React from 'react';
import {Avatar} from 'antd';
import {IProps} from './index';
import './view.scss';

const Friends: React.FC<IProps> = (props) => {
  const { checked, avatar, nickname, lastTime, lastText } = props;

  function timeToString(time: number | null) {
    if (time) {
      return new Date(time);
    }
    return '';
  }

  return (
    <div className={`chat_friend_container ${checked && 'chat_friend_container-checked'}`}>
      <Avatar
        shape="square"
        className="left"
        size="large"
        src={avatar}
      />
      <div className="right">
        <div className="info">
          <span className="name">{nickname}</span>
          <span className="time">{timeToString(lastTime)}</span>
        </div>
        <span className="message">{lastText}</span>
      </div>
    </div>
  )
}

export default Friends;
