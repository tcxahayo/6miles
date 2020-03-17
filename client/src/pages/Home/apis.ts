import {request} from '@/lib/http'

export interface ICategort {
  id: string;
  title: string;
  // icon: string;
  parentId:string,
  children: ICategort [];
}
export function getCategory(){
  return request<ICategort []>('/category',{},'GET')
}
