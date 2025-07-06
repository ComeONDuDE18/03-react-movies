import css from "./App.module.css";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import type { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";
import SearchBar from "../SearchBar/SearchBar";

const loaderStyles: CSSProperties = {
  display: "block",
  margin: "20px auto",
};

  
export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

const handleSearch = async (query: string) => {
try {
  setIsLoading(true);
  setIsError(false);
  setMovies([]);
  
  const newMovies = await fetchMovies(query);
  if (newMovies.length === 0) {
    toast.error("No movies found for your request.");
  }
  setMovies(newMovies);
} catch  {
  setIsError(true);
} finally {
  setIsLoading(false);
}
};
     const handleSelect = (movie: Movie) => {
    console.log("Movie:", movie);
  };
  return (
    <>
      <Toaster />
      <SearchBar onSearch={handleSearch} />
      {isLoading && (
  <ClipLoader
    color="#36d7b7"
    loading={isLoading}
    cssOverride={loaderStyles}
    size={50}
  />
        )}
        {isError && <p className={css.error}>Something went wrong. Please try again later.</p>}
        <ul className={css.list}>
            {movies.map((movie) => (
            <li key={movie.id} className={css.item} onClick={() => handleSelect(movie)}>
                <img
                className={css.poster}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                />
                <div className={css.info}>
                <h2 className={css.title}>{movie.title}</h2>
                <p className={css.overview}>{movie.overview}</p>
                <span className={css.releaseDate}>{movie.release_date}</span>
                <span className={css.voteAverage}>Rating: {movie.vote_average}</span>
                </div>
            </li>
            ))}
        </ul>
        </>
    );
}

