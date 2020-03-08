import React, { useState } from 'react';
import Firend from './components/friend';
import DialogBox from './components/DialogBox';
import {List} from 'antd';
import './view.scss';
import { useSelector } from 'react-redux';
import {State} from '@/store';

const Chat: React.FC = () => {
  const chatList = useSelector((state: State) => state.chat);
  const [currentChat, setCuttentChat] = useState(-1);

  return (
    <div className="chat_container">
      <List
        className="firends"
        itemLayout="vertical"
        dataSource={chatList}
        renderItem={(item, index) => {
          let lastTime = null;
          let lastText = null;
          if (item.chatLog.length > 0) {
            lastTime = item.chatLog[item.chatLog.length - 1].time
            lastText = item.chatLog[item.chatLog.length - 1].text
          }
          return (
            <div onClick={() => setCuttentChat(index)}>
              <Firend
                key={item.id}
                avatar={item.avatar}
                nickname={item.nickname}
                lastText={lastText}
                lastTime={lastTime}
                checked={index === currentChat}
              />
            </div>
          )
        }}
      />
      <div className="dialog">
        {currentChat !== -1 && (<DialogBox {...chatList[currentChat]} />)}
      </div>
    </div>
  )
}

export default Chat;
