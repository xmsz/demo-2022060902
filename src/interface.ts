export interface IPage<T> {
  page: number;
  pageSize: number;
  total: number;
  last: boolean;
  list: T[];
}

export interface IWallpaperItem {
  title: string;
  url: string;
}
