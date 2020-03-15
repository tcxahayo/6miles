import {request} from '@/lib/http';

export interface Params{
  address:string,
  goodsId:string,
  name:string,
  phone:string,
  price:number,
  remark:string,
  number:string,
  updateDate:string,
  status:number,
  goods:Igood
}

export interface Igood{
  images:string,
  title:string,
  price:string
}
export function orderDetail(id:any){
  return request<Params>('/order/'+id,{},'GET')
}
