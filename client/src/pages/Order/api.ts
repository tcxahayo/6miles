import {request} from '../../lib/http';

export interface IOrder{
  number:number,
  status:number,
  price:number,
  goodsId:string,
  goods:IGoods,
  createDate:string
}
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

export function getOrderList(data?:any){
  return request<IOrder []>('/order',data,'GET')
}
