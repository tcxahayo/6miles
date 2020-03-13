import { request } from '@/lib/http'

interface Params {
  avatar: string;
  nickname: string;
  email?: string;
}
export async function updateInfo(data: Params) {
  return request<boolean>('/user/info', data,'PUT');
}
