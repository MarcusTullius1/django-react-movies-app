import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import MovieCard from "../components/MovieCard/MovieCard";
import MovieModal from "../components/MovieModal/MovieModal";
import Login from "../components/Login/Login";

import { getPopularMovies, searchMoviesByKeyword, getMovieDetails } from "../api/moviesApi";
import { getBackendMovies, searchBackendMovies } from "../api/backendApi";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("access")));

  useEffect(() => {
    if (isLoggedIn) loadAllMovies();
  }, [isLoggedIn]);

  async function loadAllMovies() {
    try {
      const [kpMovies, backendMovies] = await Promise.all([
        getPopularMovies().then((data) => (Array.isArray(data?.films) ? data.films : [])),
        getBackendMovies().then((data) => (Array.isArray(data) ? data : [])),
      ]);
      setMovies([...backendMovies, ...kpMovies].slice(0, 18));
    } catch (err) {
      console.error("Ошибка загрузки фильмов:", err);
      setMovies([]);
    }
  }

  async function onSearch(text) {
    if (!text.trim()) return;
    try {
      const [kpMovies, backendMovies] = await Promise.all([
        searchMoviesByKeyword(text).then((data) => (Array.isArray(data?.films) ? data.films : [])),
        searchBackendMovies(text).then((data) => (Array.isArray(data) ? data : [])),
      ]);
      setMovies([...backendMovies, ...kpMovies].slice(0, 18));
    } catch (err) {
      console.error("Ошибка поиска:", err);
      setMovies([]);
    }
  }

  async function onMovieClick(movie) {
    try {
      if (movie?.filmId) {
        const details = await getMovieDetails(movie.filmId);
        setSelectedMovie(details);
      } else {
        setSelectedMovie(movie);
      }
    } catch (err) {
      console.error("Ошибка загрузки деталей фильма:", err);
    }
  }

  function handleAddToWatchlist(movie) {
    const token = localStorage.getItem("access");
    if (!token) return alert("Нужно войти в аккаунт");

    const title = movie.nameRu || movie.title;
    if (!title) return;

    fetch("http://127.0.0.1:8000/api/watchlist/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, watched: false }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка добавления");
        return res.json();
      })
      .then(() => alert(`Фильм "${title}" добавлен в watchlist`))
      .catch((err) => {
        console.error(err);
        alert("Не удалось добавить фильм");
      });
  }

  function handleLoginSuccess() {
    setIsLoggedIn(true);
  }

  if (!isLoggedIn) return <Login onLoginSuccess={handleLoginSuccess} />;

  return (
    <>
      <Header onSearch={onSearch} />

      <div className="movies">
        {movies.map((movie) => (
          <MovieCard key={movie.id || movie.filmId} movie={movie} onClick={() => onMovieClick(movie)} />
        ))}
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onAddToWatchlist={handleAddToWatchlist}
        />
      )}
    </>
  );
}
