import SearchResults from "../components/search-results";

export default async function Search(props: {
  searchParams?: Promise<{ search?: string }>;
}) {
  const resolvedSearchParams = await props.searchParams;
  const search = resolvedSearchParams?.search || "";
  const searchTrimmed = typeof search === "string" ? search.trim() : "";
  return (
    <div>
      <SearchResults query={searchTrimmed} />
    </div>
  );
}
