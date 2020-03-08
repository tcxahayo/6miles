import * as actionTypes from './actionTypes';
import * as actions from './actions';
import {IState} from './index';
import im from '@/lib/Im';

const init: IState[] = []

export default function chat(state: IState[] = init, action: actions.Type): IState[] {
  if (action.type === actionTypes.SET_CHAT_LIST) { // 设置会话列表
    return action.value;
  }
  if (action.type === actionTypes.PUT_CHAT_ITEM) { // 发起一个聊天
    // 先判断是否为主动发起的聊天
    // 再判断该会话是否已经在会话列表中，若不存在则加入列表，存在则不做操作
    const item = action.value;
    for(let i = 0; i < state.length; i++) {
      if (state[i].id === item.id) { // 主动发起的聊天对比to
        return state;
      }
    }
    state.unshift(item);
    im.setFirends(item.id.split('#')[0], state);
    return [...state];
  }
  if (action.type === actionTypes.PUT_MESSAGE) { // 保存聊天记录
    const message = action.value;
    for(let i = 0; i < state.length; i++) {
      if (state[i].id === message.sessionId) {
        state[i].chatLog.push({
          time: message.time,
          text: message.text,
          from: message.from
        });
        im.setFirends(message.sessionId.split('#')[0], state);
        return [...state]
      }
    }
  }
  return state;
}
