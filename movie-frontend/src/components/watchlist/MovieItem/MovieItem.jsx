import "./MovieItem.css";

export default function MovieItem({ movie, onToggleWatched, onDelete }) {
  return (
    <li className="movie-item">
      <label>
        <input
          type="checkbox"
          checked={movie.watched}
          onChange={() => onToggleWatched(movie.id)}
        />
        {movie.title}
      </label>
      <button onClick={() => onDelete(movie.id)}>Удалить</button>
    </li>
  );
}
