import * as actionTypes from './actionTypes';
import * as actions from './actions';
import {IState} from './index';

let initState = {
  loginModal: false, // 登陆框是否显示
  registerModal: false, // 注册框是否显示
  userInfo: null // 用户信息
}

export default function app(state: IState = initState, action: actions.Type) {
  if (action.type === actionTypes.SET_USER_INFO)  {
    return Object.assign({}, state, {
      userInfo: action.value
    })
  }
  return state;
}
