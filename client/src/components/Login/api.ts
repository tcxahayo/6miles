import {request} from '@/lib/http';
import im from '@/lib/Im';

//登录
export function login(data:{}){
  return request<string>('/login',data,'POST')
}
//获取用户信息
interface User {
  avatar: string | null;
  createDate: string,
  email: string | null;
  imPassword: string;
  latitude: number | null,
  longitude: number | null,
  nickname: string,
  phone: string
}
export async function getUserInfo(){
  const user = await request<User>('/user/info', {},'GET');
  im.login(user.phone, user.imPassword); // 环信登陆
  return user;
}
