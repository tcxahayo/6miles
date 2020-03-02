import {request} from '@/lib/http';


export function subOrder(data:any){
  return request('/order', data, 'POST')
}

export function pay(data:any){
  return request('/order/pay',data,'POST')
}
