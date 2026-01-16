import MovieItem from "../MovieItem/MovieItem";
import "./MovieList.css";

export default function MovieList({ movies, onToggleWatched, onDelete }) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          onToggleWatched={onToggleWatched}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
