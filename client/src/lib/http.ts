import axios, { Method } from 'axios';
import {getToken} from '@/lib/app';

interface ResponseData<T> {
  code: string;
  data: T;
  msg: string;
}

export function request<T>(url = '', params ={} ,method: Method = 'POST') {
  return new Promise<T>((resolve) => {
    const token = getToken();
    axios.request<ResponseData<T>>({
      url,
      method,
      data: Object.assign({token}, params)
    }).then(({status, data}) => {
      if (status === 200) {
        if (data.code === '0') {
          resolve(data.data);
        } else if (data.code === '-4'){

        } else {

        }
      }
    });
  });
}
