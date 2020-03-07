import React from 'react';
import { Avatar } from 'antd';
import {IProps} from './index';
import './view.scss';

const News: React.FC<IProps> = (props = {type: 0}) => {
  const { type } = props;

  return (
    <div className={`chat_news_container ${type === 1 && 'chat_news_container-right'}`}>
      {type === 0 && (<Avatar />)}
      <span className="text">啊？不会吧！啊</span>
      {type === 1 && (<Avatar />)}
      <p className="time">03-23 12:45</p>
    </div>
  )
}

export default News;
