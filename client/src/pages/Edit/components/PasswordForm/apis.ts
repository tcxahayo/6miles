import { request } from '@/lib/http'

interface Params {
  oldPassword: string;
  newPassword: string;
}
export async function updatePwd(data: Params) {
  return request<boolean>('/user/password/change', data,'PUT');
}
