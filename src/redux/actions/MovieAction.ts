import { ISearchCondition, SwitchTypes } from "../../services/CommonTypes";
import { IMovie, MovieService } from "../../services/MovieService";
import { IAction } from "./ActionTypes";
import { ThunkAction } from "redux-thunk";
import { IRootState } from "../reducers";

export type SaveMovieAction = IAction<
  "SAVE_MOVIE",
  {
    movies: IMovie[];
    total: number;
  }
>;
export function saveMovieAction(movies: IMovie[], total: number): SaveMovieAction {
  return {
    type: "SAVE_MOVIE",
    payload: {
      movies,
      total,
    },
  };
}

export type SetLoadingAction = IAction<"SET_LOADING", boolean>;
export function setLoadingAction(isLoading: boolean): SetLoadingAction {
  return {
    type: "SET_LOADING",
    payload: isLoading,
  };
}

export type SetConditionAction = IAction<"SET_CONDITION", ISearchCondition>;
export function setConditionAction(condition: ISearchCondition): SetConditionAction {
  return {
    type: "SET_CONDITION",
    payload: condition,
  };
}

export type DeleteMovieAction = IAction<"DELETE_MOVIE", string>;
/**
 * 生产删除电影的action对象
 * @param id
 * @returns
 */
export function deleteMovieAction(id: string): DeleteMovieAction {
  return {
    type: "DELETE_MOVIE",
    payload: id,
  };
}

export type SwitchChangeAction = IAction<"SWITCH_CHANGE", { type: SwitchTypes; value: boolean; id: string }>;
export function switchChangeAction(type: SwitchTypes, value: boolean, id: string): SwitchChangeAction {
  return {
    type: "SWITCH_CHANGE",
    payload: {
      type,
      value,
      id,
    },
  };
}

export type MovieAction = SaveMovieAction | DeleteMovieAction | SetConditionAction | SetLoadingAction | SwitchChangeAction;

/**
 * 请求电影数据
 * @param condition
 * @returns
 */
export function fetchMovies(condition: ISearchCondition): ThunkAction<Promise<void>, IRootState, any, MovieAction> {
  return async (dispatch, getState) => {
    // 1. 设置加载中的状态
    dispatch(setLoadingAction(true));
    // 2. 设置查询参数的状态
    dispatch(setConditionAction(condition));
    // 3. 向服务器请求数据
    const newCondition = getState().Movie.condition;
    const res = await MovieService.findMovies(newCondition);
    if (res.status === 200) {
      // 4. 设置电影状态
      dispatch(saveMovieAction(res.data, res.total));
    }
    // 5. 设置未加载中的状态
    dispatch(setLoadingAction(false));
  };
}

/**
 * 根据id删除电影
 * @param id
 * @returns
 */
export function deleteMovie(id: string): ThunkAction<Promise<void>, IRootState, any, MovieAction> {
  return async (dispatch, getState) => {
    dispatch(setLoadingAction(true));
    const res = await MovieService.deleteMovie(id);
    if (res.data === true) {
      dispatch(deleteMovieAction(id));
    }
    dispatch(setLoadingAction(false));
  };
}

/**
 * 触发 切换 正在热映 经典影片 即将上映的状态
 * @param type
 * @param value
 * @param id
 * @returns
 */
export function switchChange(type: SwitchTypes, value: boolean, id: string): ThunkAction<Promise<void>, IRootState, any, MovieAction> {
  return async (dispatch, getState) => {
    dispatch(setLoadingAction(true));
    const res = await MovieService.updateMovie(id, {
      [type]: value,
    });
    if (res.status) {
      dispatch(switchChangeAction(type, value, id));
    }

    dispatch(setLoadingAction(false));
  };
}
