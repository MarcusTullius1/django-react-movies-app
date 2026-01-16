import "./MovieModal.css";

export default function MovieModal({ movie, onClose, onAddToWatchlist }) {
  const title = movie.nameRu || movie.title || "Без названия";
  const poster = movie.posterUrlPreview || movie.poster || "";
  const year = movie.year || "—";
  const rating =
    movie.rating || movie.ratingKinopoisk || movie.ratingImdb || "—";
  const description =
    movie.description || movie.shortDescription || "Описание отсутствует";

  const genres = Array.isArray(movie.genres)
    ? movie.genres
        .map((g) => (typeof g === "string" ? g : g.genre || g.name))
        .filter(Boolean)
        .join(", ")
    : "";

  function handleAdd() {
    if (onAddToWatchlist) {
      onAddToWatchlist(movie);
    }
  }

  return (
    <div className="modal__bg" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>{title}</h2>
          <button onClick={onClose} className="modal__close">✖</button>
        </div>

        <div className="modal__body">
          {poster && (
            <img src={poster} alt={title} className="modal__poster" />
          )}

          <div className="modal__info">
            <p><b>Год выпуска:</b> {year}</p>
            {genres && <p><b>Жанр:</b> {genres}</p>}
            <p><b>Рейтинг:</b> {rating}</p>
            <p><b>Подробно:</b> {description}</p>
          </div>
        </div>

        <div className="modal__footer">
          <button onClick={handleAdd} className="modal__add-button">
            Добавить к просмотру
          </button>
        </div>
      </div>
    </div>
  );
}
