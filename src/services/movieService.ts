// src/services/movieService.ts

import axios from "axios";
import type { Movie } from "../types/movie";


const API_URL = "https://api.themoviedb.org/3/search/movie";

const token = import.meta.env.VITE_TMDB_TOKEN;

export default async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get(API_URL, {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.results;
}
