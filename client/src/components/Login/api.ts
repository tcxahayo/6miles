import {request} from '@/lib/http';

//登录
export function login(data:{}){
  return request<string>('/login',data,'POST')
}
//获取用户信息
interface User {
  avatar: string | null;
  createDate: string,
  email: string | null;
  latitude: number | null,
  longitude: number | null,
  nickname: string,
  phone: string
}
export function getUserInfo(){
  return request<User>('/user/info', {},'GET')
}
