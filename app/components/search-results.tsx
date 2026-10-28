import { fetchSearchResults } from "../lib/tmdb";
import { TMDBResponseElement } from "../lib/definitions";
import SearchResult from "../components/search-results-element";
import LinkButton from "./linkbutton";

export default async function SearchResults(props: { query: string }) {
  let results: TMDBResponseElement[];
  try {
    results = await fetchSearchResults({
      search: props.query,
    });
  } catch (error) {
    console.error(`Błąd wyszukiwania`, { search: props.query }, error);
    return (
      <div className="flex flex-1 flex-col justify-center items-center -mt-40">
        <p className="text-xl font-bold py-2">
          Wystąpił nieoczekiwany błąd podczas pobierania danych
        </p>
        <LinkButton
          href="/"
          className="border-transparent bg-blue-500 hover:bg-blue-700 text-white"
        >
          Wróć do wyszukiwania
        </LinkButton>
      </div>
    );
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
