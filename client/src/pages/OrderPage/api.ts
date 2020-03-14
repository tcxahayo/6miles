import {request} from '@/lib/http';

export interface Number{
  number:string
}

export function subOrder(data:any){
  return request<Number>('/order', data, 'POST')
}

export function pay(data:any){
  return request('/order/pay',data,'POST')
}
