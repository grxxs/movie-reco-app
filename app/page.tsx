import Button from "./components/button";
import { logout } from "./lib/actions/logout";

export default async function Home() {
  return (
    <div className="p-2.5 flex justify-center items-center h-full flex-col gap-10">
      <div className="flex flex-row gap-5 w-full justify-between">
        <h1 className="text-2xl ">Home page</h1>
        <form action={logout}>
          <Button type="submit">Wyloguj</Button>
        </form>
      </div>
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
