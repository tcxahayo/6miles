import axios, { Method } from 'axios';
import { getToken } from '@/lib/app';


enum Status {
  SUCCESS = 200,
  ERROR = 500,
  LOGIN_AUTHORIZATION = 302
}

interface ResponseData<T> {
  status: Status;
  data: T;
  msg: string;
}

export function request<T>(url = '', params = {}, method: Method = 'POST') {
  return new Promise<T>((resolve, reject) => {
    let config: any = {data: params}
    if(method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE') {
      config = {params: params}
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
          resolve(data.data)
        }else if (data.status === Status.ERROR) {
          alert(data.msg)
        }
      }
    });
  });
}
