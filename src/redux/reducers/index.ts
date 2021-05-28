import { combineReducers } from "redux";
import Movie, { IMovieState } from "./MovieReducer";

export interface IRootState {
  Movie: IMovieState;
}
export default combineReducers({
  Movie,
});
