import React, { useState } from 'react';
import Firend from './components/friend';
import DialogBox from './components/DialogBox';
import {List} from 'antd';
import './view.scss';

const firends: any[] = [{

}, {

}, {

}]

const Chat: React.FC = () => {

  const [currentChat, setCuttentChat] = useState(-1);

  return (
    <div className="chat_container">
      <List
        className="firends"
        itemLayout="vertical"
        dataSource={firends}
        renderItem={(item, index) => (
          <div onClick={() => setCuttentChat(index)}>
            <Firend
              key={index}
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
