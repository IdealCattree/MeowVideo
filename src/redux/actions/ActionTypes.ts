export interface IAction<T, U> {
  type: T;
  payload: U;
}
