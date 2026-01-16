import "./MovieCard.css";

function getClassByRate(vote) {
  if (vote >= 7) return "green";
  if (vote > 5) return "orange";
  return "red";
}

function formatGenres(genres) {
  if (!genres) return ".";

  if (Array.isArray(genres)) {
    const arr = genres.map(g => g?.name || g?.genre).filter(Boolean);
    if (arr.length) return arr.join(", ");
  }

  if (typeof genres === "string" && genres.trim()) return genres;

  if (typeof genres === "object") {
    const values = Object.values(genres)
      .flat()
      .map(v => (typeof v === "string" ? v : v?.name || v?.genre))
      .filter(Boolean);
    if (values.length) return values.join(", ");
  }

  return ".";
}

export default function MovieCard({ movie, onClick }) {
  const title = movie.title || movie.nameRu || "No title";
  const poster = movie.poster || movie.posterUrlPreview || "https://via.placeholder.com/300x450?text=No+Image";
  const genres = formatGenres(movie.genres);
  const rating = movie.rating || movie.ratingKinopoisk || movie.ratingImdb;

  return (
    <div className="movie" onClick={onClick}>
      <div className="movie__cover-inner">
        <img src={poster} className="movie__cover" alt={title} />
        <div className="movie__cover--darkened"></div>
      </div>

      <div className="movie__info">
        <div className="movie__title">{title}</div>
        <div className="movie__category">{genres}</div>
      </div>

      <div className={`movie__average ${rating ? `movie__average--${getClassByRate(rating)}` : ""}`}>
        {rating || "—"}
      </div>
    </div>
  );
}
