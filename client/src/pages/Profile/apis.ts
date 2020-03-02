import {request} from '@/lib/http';

export interface IGoods {
  images:string,
  price:number,
  title:string,
  id:string,
  user: IUser
}
export interface IUser{
  avatar: string;
  nickname: string;
}

export function getPublishList(){
  return request<IGoods []>('/goods/sellList',{},'GET')
}

export function getCollectList(){
  return request<IGoods []>('/goods/collect',{},'GET')
}
