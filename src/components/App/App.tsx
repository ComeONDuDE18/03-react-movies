import css from "./App.module.css";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import toast from "react-hot-toast";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";




  
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

const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

 const handleSelect = (movie: Movie) => {
  setSelectedMovie(movie);
};
const handleClose = () => {
  setSelectedMovie(null);
};

 return (
  <div className={css.app}> 
  <SearchBar onSearch={handleSearch} />
   {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && (
  <MovieModal movie={selectedMovie} onClose={handleClose} />
)}
  </div>
  );
}


