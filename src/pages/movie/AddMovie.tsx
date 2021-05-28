import React from "react";
import MovieForm from "../../components/MovieForm";
import { MovieService } from "../../services/MovieService";

export default function AddMovie() {
  return (
    <div>
      <MovieForm
        onSubmit={async movie => {
          const resp = await MovieService.addMovie(movie);
          if (resp.status === 200) {
            return "";
          }
          return resp.msg;
        }}
      />
    </div>
  );
}
