const API_KEY = "e2fa017a-b8db-4da0-aedc-00a70e797410";


export async function getPopularMovies() {
  const url = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";

  const resp = await fetch(url, {
    headers: { "X-API-KEY": API_KEY },
  });

  return resp.json();
}

export async function searchMoviesByKeyword(keyword) {
  const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}`;

  const resp = await fetch(url, {
    headers: { "X-API-KEY": API_KEY },
  });

  return resp.json();
}

export async function getMovieDetails(filmId) {
  const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}`;

  const resp = await fetch(url, {
    headers: { "X-API-KEY": API_KEY },
  });

  return resp.json();
}
