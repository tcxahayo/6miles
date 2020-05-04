export interface TableListItem {
  id: string;
  phone: string;
  email?: string;
  avatar: string;
  nickname: string;
  longitude?: string;
  latitude?: number;
  remake?: number;
  updateDate: Date;
  createDate: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  size: number;
  page: number;
  nickname?: string;
  phone?: string;
  email?: string;
}

export interface UpdateParams {
  id: string;
  email?: string;
  avatar: string;
  nickname: string;
}

export interface TableListResponse {
  status: number;
  msg: string;
  data: {
    size: number;
    page: number;
    totalSize: number;
    totalPage: number;
    list: TableListItem[];
  };
}
export interface Response {
  status: number;
  msg: string;
  data: boolean;
}
