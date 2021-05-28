import axios from "axios";
import { IResponseData, IResponseError, IResponsePageData, ISearchCondition } from "./CommonTypes";
export interface IMovie {
  _id?: string;
  name: string;
  types: string[];
  areas: string[];
  time: number;
  isHot: boolean;
  isClassic: boolean;
  isComing: boolean;
  description?: string;
  poster?: string;
}

export class MovieService {
  public static async addMovie(movie: IMovie): Promise<IResponseData<IMovie> | IResponseError> {
    const { data } = await axios.post("/api/movie", movie);
    return data;
  }

  public static async updateMovie(id: string, movie: Partial<IMovie>): Promise<IResponseData<true> | IResponseError> {
    const { data } = await axios.put("/api/movie/" + id, movie);
    return data;
  }

  public static async deleteMovie(id: string): Promise<IResponseData<true> | IResponseError> {
    const { data } = await axios.delete("/api/movie/" + id);
    return data;
  }

  public static async findMovieById(id: string): Promise<IResponseData<IMovie | null> | IResponseError> {
    const { data } = await axios.get("/api/movie/" + id);
    return data;
  }

  public static async findMovies(condition: ISearchCondition): Promise<IResponsePageData<IMovie>> {
    const { data } = await axios.get("/api/movie", {
      params: condition,
    });
    return data;
  }
}
