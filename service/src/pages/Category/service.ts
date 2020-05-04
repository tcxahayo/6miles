import request from '@/utils/request';
import { TreeResponse, Response, Category } from './data.d';

export async function query(): Promise<TreeResponse> {
  return request('/api/category');
}

export async function save(data: Category): Promise<Response> {
  return request('/api/category', {
    method: 'post',
    data,
  });
}
export async function update(data: Category): Promise<Response> {
  return request('/api/category', {
    method: 'put',
    data,
  });
}
export async function del(id: string): Promise<Response> {
  return request(`/api/category/${id}`, {
    method: 'delete',
  });
}
