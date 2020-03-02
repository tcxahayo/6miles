import {request} from '@/lib/http';

export async function getCode(phone:string){
  return await request<boolean>('/code',{phone},'GET')
}


export async function register(data: {}){
  return await request('/user/register',data,'POST')
}
