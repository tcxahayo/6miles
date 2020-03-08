import * as Types from './actionTypes';
import { IState, Message } from './index';

export type Type = SetListAction | PutChatItemAction | PutMessageAction;

// 获取聊天列表
interface SetListAction {
  type: Types.SET_CHAT_LIST;
  value: IState[]
}
export function setChatList(value: IState[]): SetListAction {
  return {
    type: Types.SET_CHAT_LIST,
    value
  }
}


// 发起一个聊天
interface PutChatItemAction {
  type: Types.PUT_CHAT_ITEM,
  value: IState
}
export function putChatItem(value: IState): PutChatItemAction {
  return {
    type: Types.PUT_CHAT_ITEM,
    value
  }
}

// 保存信息记录
interface PutMessageAction {
  type: Types.PUT_MESSAGE,
  value: Message
}
export function putMessage(value: Message): PutMessageAction {
  return {
    type: Types.PUT_MESSAGE,
    value
  }
}
