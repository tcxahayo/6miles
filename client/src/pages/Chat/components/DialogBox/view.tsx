import React,{ useRef, useEffect } from 'react';
import {Button} from 'antd';
import News from '../News';
import './view.scss';

const DialogBox: React.FC = () => {
  const messageBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageBox.current){
      messageBox.current.scrollTop = messageBox.current.scrollHeight;
    }
  }, [messageBox])

  function sendMessage(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if(e.keyCode === 13) {
      e.preventDefault();
      console.log('发送')
    }
  }

  return (
    <div className="chat_dialogbox_container">
      <h2 className="title">It's me</h2>
      <div className="message" ref={messageBox}>
        <News type={1} />
        <News type={1} />
        <News type={1} />
        <News type={0} />
        <News type={0} />
        <News type={1} />
        <News type={1} />
        <News type={1} />
        <News type={0} />
        <News type={1} />
      </div>
      <div className="from">
        <textarea
          className="text"
          placeholder="消息"
          onKeyDown={sendMessage}
          rows={6}
        />
        <Button type="primary" className="btn">发送</Button>
      </div>
    </div>
  )
}

export default DialogBox;
