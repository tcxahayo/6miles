import request from '@/utils/request';
import { TableListParams, TableListResponse, Response, UpdateParams } from './data';

export async function query(params: TableListParams): Promise<TableListResponse> {
  return request('/api/user', {
    params,
  });
}

export async function update(params: UpdateParams): Promise<Response> {
  return request('/api/user/info/admin', {
    data: params,
    method: 'put',
  });
}
