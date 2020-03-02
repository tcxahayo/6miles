import {request} from '@/lib/http';

export function releaseGoods(data:{}){
  return request('/goods',data,'POST')
}
