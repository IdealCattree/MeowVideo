/* eslint { "import/no-anonymous-default-export": off } */
import { IMovie } from "../../services/MovieService";
import { ISearchCondition } from "../../services/CommonTypes";
import { DeleteMovieAction, MovieAction, SaveMovieAction, SetConditionAction, SetLoadingAction, SwitchChangeAction } from "../actions/MovieAction";

export type IMovieCondition = Required<ISearchCondition>;

/**
 * 电影的状态
 */
export interface IMovieState {
  /**
   * 电影的数组
   */
  data: IMovie[];
  /**
   * 查询条件
   */
  condition: IMovieCondition;
  /**
   * 电影总数
   */
  total: number;
  /**
   * 是否为正在加载中
   */
  isLoading: boolean;
  /**
   * 总页数
   */
  totalPage: number;
}

const initialState: IMovieState = {
  data: [],
  condition: {
    key: "",
    page: 1,
    limit: 10,
  },
  total: 0,
  isLoading: false,
  totalPage: 0,
};

/**
 * 保存电影的操作
 * @param state
 * @param action
 * @returns
 */
function saveMovie(state: IMovieState, action: SaveMovieAction): IMovieState {
  return {
    ...state,
    data: action.payload.movies,
    total: action.payload.total,
    totalPage: Math.ceil(action.payload.total / state.condition.limit),
  };
}

/**
 * 删除电影操作
 * @param state
 * @param action
 * @returns
 */
function deleteMovie(state: IMovieState, action: DeleteMovieAction): IMovieState {
  return {
    ...state,
    data: state.data.filter(m => m._id !== action.payload),
    total: state.total - 1,
    totalPage: Math.ceil((state.total - 1) / state.condition.limit),
  };
}

/**
 * 设置查询条件操作
 * @param state
 * @param action
 * @returns
 */
function setCondition(state: IMovieState, action: SetConditionAction): IMovieState {
  const newCondition = {
    ...state,
    condition: {
      ...state.condition,
      ...action.payload,
    },
  };
  newCondition.totalPage = Math.ceil(newCondition.total / newCondition.condition.limit);
  return newCondition;
}

/**
 * 设置是否正在加载中操作
 * @param state
 * @param action
 * @returns
 */
function setLoading(state: IMovieState, action: SetLoadingAction): IMovieState {
  return {
    ...state,
    isLoading: action.payload,
  };
}

function switchChange(state: IMovieState, action: SwitchChangeAction): IMovieState {
  const movie = state.data.find(m => m._id === action.payload.id);
  if (!movie) {
    return state;
  }

  const newMovie = { ...movie, [action.payload.type]: action.payload.value };

  const newData = state.data.map(d => {
    if (d._id === action.payload.id) {
      return newMovie;
    }
    return d;
  });

  return {
    ...state,
    data: newData,
  };
}

export default (state: IMovieState = initialState, action: MovieAction): IMovieState => {
  switch (action.type) {
    case "SAVE_MOVIE":
      return saveMovie(state, action);
    case "DELETE_MOVIE":
      return deleteMovie(state, action);
    case "SET_CONDITION":
      return setCondition(state, action);
    case "SET_LOADING":
      return setLoading(state, action);
    case "SWITCH_CHANGE":
      return switchChange(state, action);
    default:
      return state;
  }
};
