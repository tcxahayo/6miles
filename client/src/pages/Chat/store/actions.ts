import * as Types from './actionTypes';
import {IState} from './index';

export type Type = SetListAction;

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
