export interface Category {
  id: string;
  parentId: string;
  parentTitle: string;
  title: string;
  sort: number;
  icon: string | null;
  children: Category[];
}

export interface TreeResponse {
  status: number;
  msg: string;
  data: Category[];
}

export interface Response {
  status: number;
  msg: string;
  data: boolean;
}
