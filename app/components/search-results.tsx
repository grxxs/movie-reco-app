import { fetchSearchResults } from "../lib/tmdb";
import { TMDBResponseElement } from "../lib/definitions";

export default async function SearchResults(props: { query: string }) {
  let results: TMDBResponseElement[];
  try {
    results = await fetchSearchResults({
      search: props.query,
    });
  } catch (error) {
    console.error(`Błąd wyszukiwania`, { search: props.query }, error);
    return <div>Wystąpił nieoczekiwany błąd podczas pobierania danych</div>;
  }
  return (
    <div>
      <p>Wyniki wyszukiwania:</p>
      {results.map((el) => (
        <div key={el.id}>
          <hr />
          <p>{el.title || el.name}</p>
          <p>{el.overview}</p>
          <p>{el.popularity}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
