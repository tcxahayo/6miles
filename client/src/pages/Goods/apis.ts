import {request} from '@/lib/http';

export interface IGoods{
  totalSize:number,
  list:IList []
}

export interface IList {
  images:string,
  price:number,
  title:string,
  id:string,
  collection:boolean,
  area:string,
  user: IUser
}
export interface IUser{
  avatar: string;
  nickname: string;
}

export function getGoods(data:any){
    return request<IGoods>('/goods',data,'GET')
}
