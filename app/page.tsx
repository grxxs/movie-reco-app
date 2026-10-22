import Button from "./components/button";

export default function Home() {
  return (
    <div className="p-2.5 flex justify-center items-center h-full flex-col gap-10">
      <form
        action="/search"
        method="GET"
        className="flex flex-col gap-2 w-96 py-8 px-4 rounded-2xl shadow-xl/20 items-center justify-center"
      >
        <label htmlFor="titleInput">Wyszukaj: </label>
        <input
          type="text"
          id="titleInput"
          name="search"
          className="border border-gray-300 py-1 px-2 rounded text-sm"
        />
        <Button type="submit" className="w-1/4">
          Szukaj
        </Button>
      </form>
    </div>
  );
}
