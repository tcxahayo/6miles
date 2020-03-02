import app from './reduces';
import * as actions from './actions';

export interface IState {
  loginModal: boolean;
  registerModal: boolean;
  userInfo: any
}
export {
  app,
  actions
}
