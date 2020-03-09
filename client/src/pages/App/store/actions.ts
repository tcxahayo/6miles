import * as actionTypes from './actionTypes';

export type Type = UserinfoAction;

export interface UserinfoAction {
  value: any,
  type: actionTypes.SET_USER_INFO
}
 //存取用户信息
 export const setUserInfo = (value:any) => ({
   type: actionTypes.SET_USER_INFO,
   value:value
 });
