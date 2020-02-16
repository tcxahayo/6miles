import * as actionTypes from './actionTypes';
import * as actions from './actions';
import {IState} from './index';

let initState = {
  loginModal: false, // 登陆框是否显示
  registerModal: false // 注册框是否显示
}

export default function app(state: IState = initState, action: actions.Type) {
  if (action.type === actionTypes.CHANGE_LOGIN_MODAL) {
    return Object.assign({}, state, {loginModal: !state.loginModal})
  }
  if (action.type === actionTypes.CHANGE_REGISTER_MODAL) {
    return Object.assign({}, state, {loginModal: !state.registerModal})
  }
  return state;
}
