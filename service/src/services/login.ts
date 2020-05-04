import request from '@/utils/request';

export interface LoginParamsType {
  phone: string;
  password: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login', {
    method: 'POST',
    data: Object.assign({ type: 2 }, { ...params }),
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
