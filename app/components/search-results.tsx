import { fetchSearchResults } from "../lib/tmdb";
import { TMDBResponseElement } from "../lib/definitions";
import SearchResult from "../components/search-results-element";
import SearchMessage from "./search-message";

export default async function SearchResults({ query }: { query: string }) {
  let results: TMDBResponseElement[];
  const trimmedQuery = query.trim();
  if (trimmedQuery === "") {
    return <SearchMessage message="Wpisz tytuł, żeby wyszukać" />;
  }
  try {
    results = await fetchSearchResults({
      search: trimmedQuery,
    });
  } catch (error) {
    console.error(`Błąd wyszukiwania`, { search: trimmedQuery }, error);
    return (
      <SearchMessage message="Wystąpił nieoczekiwany błąd podczas pobierania danych" />
    );
  }
  if (results.length === 0) {
    return <SearchMessage message={`Brak wyników dla "${trimmedQuery}"`} />;
  }
  return (
    <div className="flex flex-1 flex-col items-center divide-y-2 divide-gray-200 divide-solid">
      <p className="text-xl font-bold py-2">Wyniki wyszukiwania:</p>
      {results.map((el) => (
        <SearchResult item={el} key={el.id} />
      ))}
    </div>
  );
}
