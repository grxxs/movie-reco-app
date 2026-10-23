import { fetchSearchResults } from "../lib/tmdb";
import { TMDBResponseElement } from "../lib/definitions";
import SearchResult from "../components/search-results-element";

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
    <div className="flex flex-col align-center items-center divide-y-2 divide-gray-200 divide-solid">
      <p className="text-xl font-bold py-2">Wyniki wyszukiwania:</p>
      {results.map((el) => (
        <SearchResult item={el} key={el.id} />
      ))}
    </div>
  );
}
