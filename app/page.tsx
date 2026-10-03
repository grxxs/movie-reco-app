import { getData } from "./lib/actions";

export default async function Home() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_BEARER}`,
    },
  };

  let response = await fetch(
    "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    options,
  );
  let data = await response.json();
  let titles = await data.results.map(
    (result: any) => result.name || result.title,
  );
  console.log(titles);
  return (
    <div>
      <main>
        <h2>Home page</h2>
      </main>
    </div>
  );
}
