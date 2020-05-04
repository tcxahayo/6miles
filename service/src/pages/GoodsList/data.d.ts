export interface TableListItem {
  id: string;
  title: string;
  price: number;
  categoryId: string;
  images: string;
  desc: string;
  area?: string;
  status?: number;
  updateDate: Date;
  createDate: Date;
  user: {
    nickname: string;
    avatar: string;
    phone: string;
    email?: string;
  };
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
  keyword?: string;
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
