export default async function Home() {
  return (
    <div>
      <h2>Home page</h2>
      <form action="/search" method="GET">
        <label htmlFor="titleInput">Wyszukaj: </label>
        <input type="text" id="titleInput" name="search" />
        <button>Szukaj</button>
      </form>
    </div>
  );
}
