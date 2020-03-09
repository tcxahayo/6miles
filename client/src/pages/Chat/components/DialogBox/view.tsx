import React,{ useRef, useEffect, useMemo } from 'react';
import {Button} from 'antd';
import im from '@/lib/Im';
import { IState } from '../../store';
import News from '../News';
import {State} from '@/store';
import { useSelector } from 'react-redux';
import './view.scss';

const DialogBox: React.FC<IState> = (props) => {
  const { chatLog, nickname, avatar, id } = props;
  const messageBox = useRef<HTMLDivElement>(null);
  const user = useSelector((state: State) => state.app.userInfo);
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (messageBox.current && chatLog.length > 0){
      messageBox.current.scrollTop = messageBox.current.scrollHeight;
    }
  }, [messageBox, chatLog])

  const toId = useMemo(() => id.split('#')[1], [id])

  function textKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if(e.keyCode === 13) {
      e.preventDefault();
      sendMessage();
    }
  }

  function sendMessage() {
    if (ref.current && ref.current.value) {
      const value = ref.current.value;
      im.sendMsg(toId, value);
      ref.current.value = '';
    }
  }


  return (
    <div className="chat_dialogbox_container">
      <h2 className="title">{ nickname }</h2>
      <div className="message" ref={messageBox}>
        {chatLog.map(item => (
          <News
            key={item.time}
            avatar={item.from ===  toId ? avatar : user.avatar}
            type={item.from ===  toId? 0 : 1}
            time={item.time}
            text={item.text}
          />
        ))}
      </div>
      <div className="from">
        <textarea
          ref={ref}
          className="text"
          placeholder="消息"
          onKeyDown={textKeyDown}
          rows={6}
        />
        <Button type="primary" className="btn" onClick={sendMessage}>发送</Button>
      </div>
    </div>
  )
}

export default DialogBox;
