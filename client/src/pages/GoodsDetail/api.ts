import {request} from '@/lib/http';

export interface Param{
  details:Details,
  relatedList:RelatedList []
}
export interface Details{
  id:string,
  title:string,
  price:string,
  images:string,
  desc:string,
  area:string,
  user:User,
  collection:boolean
}
export interface RelatedList{
  id:string,
  title:string,
  price:number,
  images:string,
  desc:string,
  area:string,
  user:User,
  collection:boolean
}

interface User{
  avatar:string;
  nickname:string;
  phone: string;
}

//商品详情
export function getDetail(id:any){
  return request<Param>('/goods/' + id , {},'GET')
}
//商品相关推荐
export function conectGoods(id:any){
  return request<Param>('/goods/details/'+id,{},'GET')
}
