import chat from './reduces';
import * as actions from './actions';

export interface IState {
  id: string; // 会话id：由“自己id#对方id”组成，用于标示会话是否已经存在
  avatar: string; // 头像
  nickname: string; // 昵称
  chatLog: ChatLog[]; // 聊天记录
}
interface ChatLog {
  from: string; // 发送人
  text: string; // 文本信息
  time: number; // 发送时间
}

export interface Message {
  sessionId: string; // 会话id：由“自己id#对方id”组成，用于标示会话是否已经存在
  from: string; // 发送人
  text: string; // 文本信息
  time: number; // 发送时间
}

export default chat;
export {
  actions
};
