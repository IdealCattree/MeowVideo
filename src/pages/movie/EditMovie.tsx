import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import MovieForm from "../../components/MovieForm";
import { IMovie, MovieService } from "../../services/MovieService";

interface IParams {
  id: string;
}
interface IState {
  movie?: IMovie;
}
export default class EditMovie extends Component<RouteComponentProps<IParams>, IState> {
  state: IState = {
    movie: undefined,
  };

  async componentDidMount() {
    const res = await MovieService.findMovieById(this.props.match.params.id);
    if (res.status === 200) {
      this.setState({
        movie: res.data!,
      });
    }
  }

  render() {
    return (
      <div>
        <MovieForm
          movie={this.state.movie}
          onSubmit={async movie => {
            const res = await MovieService.updateMovie(this.props.match.params.id, movie);
            if (res.status === 200) {
              return "";
            }
            return res.msg;
          }}
        />
      </div>
    );
  }
}
