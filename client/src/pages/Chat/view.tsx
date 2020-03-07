import React, { useState, useEffect } from 'react';
import Firend from './components/friend';
import DialogBox from './components/DialogBox';
import {List} from 'antd';
import './view.scss';
import { useSelector } from 'react-redux';
import {State} from '@/store';

const Chat: React.FC = () => {
  const chatList = useSelector((state: State) => state.chat);

  useEffect(() => {
  }, []);

  const [currentChat, setCuttentChat] = useState(-1);

  return (
    <div className="chat_container">
      <List
        className="firends"
        itemLayout="vertical"
        dataSource={chatList}
        renderItem={(item, index) => (
          <div onClick={() => setCuttentChat(index)}>
            <Firend
              key={item.toImUserId}
              avatar={item.avatar}
              nickname={item.nickname}
              lastText={item.lastText}
              lastTime={item.lastTime}
              checked={index === currentChat}
            />
          </div>
        )}
      />
      <div className="dialog">
        {currentChat !== -1 && (<DialogBox />)}
      </div>
    </div>
  )
}

export default Chat;
