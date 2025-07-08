// src/services/movieService.ts

import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}


axios.defaults.baseURL = "https://api.themoviedb.org/3";

const token = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (
  query: string,
  page = 1
): Promise<Movie[]> => {
  const config = {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<MovieResponse>("/search/movie", config);
  return response.data.results;
};