import {request} from '@/lib/http';
import im from '@/lib/Im';

export async function getCode(phone:string){
  return await request<boolean>('/code',{phone},'GET')
}

interface Register {
  nickname: string;
  password: string;
  phone: string;
  code: string;
}
export async function register(data: Register){
  const imPassword = await request<string>('/user/register',data,'POST');
  im.register(data.phone, imPassword, data.nickname); // 环信注册
  return true;
}
