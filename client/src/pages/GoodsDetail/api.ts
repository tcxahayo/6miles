import {request} from '@/lib/http';

export interface Param{
  id:string,
  title:string,
  price:string,
  images:string,
  desc:string,
  area:string,
  user:User
}

interface User{
  avatar:string,
  nickname:string
}

export function getDetail(id:any){
  return request<Param>('/goods/' + id , {},'GET')
}
