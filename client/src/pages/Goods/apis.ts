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

export function getGoods(){
    return request<IGoods []>('/goods',{},'GET')
}
