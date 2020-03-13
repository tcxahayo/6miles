import axios, { Method } from 'axios';
import { getToken } from '@/lib/app';
import {message} from 'antd';

enum Status {
  SUCCESS = 200, // 请求成功
  ERROR = 500, // 请求失败
  LOGIN_AUTHORIZATION = 302, // 未登陆
  PARAM_ERROR = 401 // 参数错误
}

interface ResponseData<T> {
  status: Status;
  data: T;
  msg: string;
}

export function request<T>(url = '', params = {}, method: Method = 'POST') {
  return new Promise<T>((resolve, reject) => {
    let config: any = { data: params }
    if (method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE') {
      config = { params: params }
    }
    axios.request<ResponseData<T>>(Object.assign({
      baseURL: '/',
      url,
      method,
      headers: {
        token: getToken()
      }
    }, config)).then(({ status, data }) => {
      if (status === 200) {
        if (data.status === Status.SUCCESS) {
          resolve(data.data);
        } else if (data.status === Status.ERROR) {
          message.error(data.msg);
          reject();
        } else if (data.status === Status.PARAM_ERROR) {
          message.error(data.msg);
        } else if (data.status === Status.LOGIN_AUTHORIZATION) {
          message.error('还未登陆，请先登陆！');
        }
      }
    });
  });
}
