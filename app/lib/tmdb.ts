import { TMDBresponse } from "./definitions";
import { env } from "./env";
export async function fetchSearchResults(props: { search: string }) {
  const query = encodeURIComponent(props.search);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${env.TMDB_BEARER}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query}&language=pl-PL`,
    {
      ...options,
      signal: AbortSignal.timeout(5000),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Błąd połączenia ${response.status} - ${response.statusText}`,
    );
  }

  const data: TMDBresponse = await response.json();
  const filtered = data.results.filter(
    (el) => el.media_type === "tv" || el.media_type === "movie",
  );

  const ordered = filtered
    .sort((el1, el2) => el2.popularity - el1.popularity)
    .slice(0, 10);

  return ordered;
}
