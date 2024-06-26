export type InitialData = any[];

export interface Options {
  scrollToTop?: boolean;
  pageSize?: number;
}

export interface UseListReturn {
  data: InitialData;
  setData?: any;
}
