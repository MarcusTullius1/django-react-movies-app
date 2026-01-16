import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieList from "../MovieList/MovieList";
import AddMovieForm from "../AddMovieForm/AddMovieForm";
import "./WatchlistPage.css";

export default function WatchlistPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setMovies([]);
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:8000/api/watchlist/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMovies(data);
        else if (Array.isArray(data?.results)) setMovies(data.results);
        else setMovies([]);
        setLoading(false);
      })
      .catch(() => {
        setMovies([]);
        setLoading(false);
      });
  }, [token]);

  const addMovie = (title) => {
    if (!token || !title) return;

    fetch("http://127.0.0.1:8000/api/watchlist/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, watched: false }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.id) setMovies((prev) => [...prev, data]);
      });
  };

  const deleteMovie = (id) => {
    if (!token) return;

    fetch(`http://127.0.0.1:8000/api/watchlist/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    });
  };

  const toggleWatched = (id) => {
    if (!token) return;
    const movie = movies.find((m) => m.id === id);
    if (!movie) return;

    fetch(`http://127.0.0.1:8000/api/watchlist/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ watched: !movie.watched }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.id)
          setMovies((prev) => prev.map((m) => (m.id === id ? data : m)));
      });
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="watchlist-page">
      <h1>Список фильмов к просмотру</h1>
      <button className="back-button" onClick={() => navigate("/")}>
        MovieApp
      </button>

      <AddMovieForm onAdd={addMovie} />

      <MovieList
        movies={movies}
        onToggleWatched={toggleWatched}
        onDelete={deleteMovie}
      />
    </div>
  );
}
