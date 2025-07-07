import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];  
  onSelect: (movie: Movie) => void;
   }

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
    if (movies.length === 0) return null;
    return (
        <ul className={css.grid}>
        {movies.map((movie) => (
            <li key={movie.id} className={css.item} onClick={() => onSelect(movie)}>
            <img
                className={css.poster}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <div className={css.info}>
                <h2 className={css.title}>{movie.title}</h2>
            </div>
            </li>
        ))}
        </ul>
    );
    }
     
