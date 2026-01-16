const BASE = "http://127.0.0.1:8000/api";


function normalizeBackendMovie(raw) {
  return {
    id: raw.id,
    title: raw.title ?? raw.nameRu ?? "No title",
    poster: raw.poster ?? raw.posterUrlPreview ?? "",
    rating: raw.rating ?? null,
    genres: Array.isArray(raw.genres)
      ? raw.genres.map(g => g.name ?? g.genre).filter(Boolean)
      : [],
    description: raw.description ?? "",
    year: raw.year ?? raw.filmYear ?? null,
    _raw: raw
  };
}

export async function getBackendMovies() {
  const res = await fetch(`${BASE}/movies/`);
  if (!res.ok) throw new Error("Backend movies fetch failed");
  const data = await res.json();
  return Array.isArray(data) ? data.map(normalizeBackendMovie) : [];
}

export async function searchBackendMovies(query) {
  const res = await fetch(`${BASE}/movies/?search=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Backend search failed");
  const data = await res.json();
  return Array.isArray(data) ? data.map(normalizeBackendMovie) : [];
}

export async function getBackendMovieDetails(id) {
  const res = await fetch(`${BASE}/movies/${id}/`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Backend movie details fetch failed");
  const raw = await res.json();
  return normalizeBackendMovie(raw);
}
