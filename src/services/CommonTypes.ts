export interface IResponseData<T> {
  status: number;
  msg: string;
  data: T;
}

export interface IResponseError {
  status: number;
  msg: string;
  data: null;
}

export interface IResponsePageData<T> {
  status: number;
  msg: string;
  data: T[];
  total: number;
}

export interface ISearchCondition {
  page?: number;
  limit?: number;
  key?: string;
}

export enum SwitchTypes {
  isHot = "isHot",
  isComing = "isComing",
  isClassic = "isClassic",
}
