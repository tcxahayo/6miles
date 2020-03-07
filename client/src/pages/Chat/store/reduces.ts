import * as actionTypes from './actionTypes';
import * as actions from './actions';
import {IState} from './index';

const init: IState[] = []

export default function chat(state: IState[] = init, action: actions.Type): IState[] {
  if (action.type === actionTypes.SET_CHAT_LIST) {
    return action.value;
  }
  return state;
}
