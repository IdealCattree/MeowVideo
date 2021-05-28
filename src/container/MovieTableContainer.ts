import { connect } from "react-redux";
import { IRootState } from "../redux/reducers";
import MovieTable, { IMovieEvents } from "../components/MovieTable";
import {
  deleteMovie,
  fetchMovies,
  setConditionAction,
  switchChange,
} from "../redux/actions/MovieAction";

function mapStateToProps(state: IRootState) {
  return state.Movie;
}

function mapDispatchToProps(dispatch: any): IMovieEvents {
  return {
    onLoad() {
      dispatch(
        fetchMovies({
          page: 1,
          limit: 10,
          key: "",
        })
      );
    },
    onSwitchChange(type, value, id) {
      dispatch(switchChange(type, value, id));
    },
    async deleteChange(id) {
      await dispatch(deleteMovie(id));
    },
    onPageChange(newPage) {
      dispatch(fetchMovies({ page: newPage }));
    },
    onChangeKey(key) {
      dispatch(
        setConditionAction({
          key,
        })
      );
    },
    onSearch() {
      dispatch(fetchMovies({ page: 1 }));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable);
