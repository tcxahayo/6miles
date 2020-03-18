import {request} from '@/lib/http';

export function releaseGoods(data:{}){
  return request('/goods',data,'POST')
}

export function editGoods(id:any,data:any){
  return request('/goods/'+id,data,'PUT')
}
