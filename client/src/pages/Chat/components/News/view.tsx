import React from 'react';
import { Avatar } from 'antd';
import {IProps} from './index';
import './view.scss';

const News: React.FC<IProps> = (props) => {
  const { type, text, time, avatar } = props;

  return (
    <div className={`chat_news_container ${type === 1 && 'chat_news_container-right'}`}>
      {type === 0 && (<Avatar src={avatar} />)}
      <span className="text">{ text }</span>
      {type === 1 && (<Avatar src={avatar} />)}
      <p className="time">{ time }</p>
    </div>
  )
}

export default News;
