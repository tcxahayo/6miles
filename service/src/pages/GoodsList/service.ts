import request from '@/utils/request';
import { TableListParams, TableListResponse, Response, TableListItem } from './data';

export async function query(params: TableListParams): Promise<TableListResponse> {
  return request('/api/goods', {
    params,
  });
}

export async function goodsEdit(params: TableListItem): Promise<Response> {
  return request(`/api/goods/${params.id}`, {
    data: params,
    method: 'put',
  });
}

export async function del(id: string): Promise<Response> {
  return request(`/api/goods/${id}`, {
    method: 'delete',
  });
}
