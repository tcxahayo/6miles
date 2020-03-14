import {request} from '@/lib/http';

export interface IProps {
  img: string;
  //？非必传，不带？是必传
  userName: string;
  price: number;
  avatar:string;
  address?:string;
  title:string;
  imageClassName?: string;
  goodId:string;
  collection:boolean;
  index?:number;
  area?:string;
  changeIndex?:()=>void
}

export function collect(data:any){
  return request('/goods/collect',data,'POST')
}
