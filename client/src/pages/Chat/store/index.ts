import chat from './reduces';
import * as actions from './actions';

export interface IState {
  avatar: string; // 头像
  myImUserId?: string; // 个人id
  toImUserId: string; // 接收人im用户id
  nickname: string; // 昵称
  lastTime: number | null; // 最后发送时间
  lastText: string | null; // 最后发送的信息
  chatLog: ChatLog[]; // 聊天记录
}
interface ChatLog {
  imUserId: string; // im用户id
  text: string; // 文本信息
  time: number; // 发送时间
}
export default chat;
export {
  actions
};
