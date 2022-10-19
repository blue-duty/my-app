import { request } from 'umi';
import { TableListItem } from './data';

//全部数据
export async function rule(
  options?: { [key: string]: any },
) {
  return request<{
    data: TableListItem[];
    success?: boolean;
  }>('/sss/departments', {
    method: 'GET',
    ...(options || {}),
    headers: {
      'X-Auth-Token': `${localStorage.getItem('X-Auth-Token')}`,
    },
  });
}


// 新增
export async function addRule(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/rule', {
    data,
    method: 'POST',
    ...(options || {}),
    headers: {
      'X-Auth-Token': `${localStorage.getItem('X-Auth-Token')}`,
    },
  });
}

//删除
export async function removeRule(data: number , options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

//编辑
export async function updateRule(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/rule', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}