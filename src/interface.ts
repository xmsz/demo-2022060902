export interface IPage<T> {
  page: number;
  pageSize: number;
  total: number;
  last: boolean;
  list: T[];
}

export interface IResponse<T> {
  code: number;
  data: T;
  message: string;
}

export interface IWallpaperItem {
  title: string;
  url: string;
}
