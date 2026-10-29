import { TitleDetails } from "../lib/definitions";
import { getType, getYear } from "../lib/format/fromat-helper";
import Image from "next/image";
import AddToList from "./add-to-list";

export function SearchResultDetails({
  details,
  user,
  onList,
}: {
  details: TitleDetails;
  user: boolean;
  onList: boolean;
}) {
  let status: "logged" | "added" | "guest" = "guest";

  if (user && !onList) {
    status = "logged";
  } else if (user && onList) {
    status = "added";
  } else {
    status = "guest";
  }

  return (
    <div>
      {details.backdropPath !== null ? (
        <div
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/w1280${details.backdropPath}")`,
          }}
          className="h-90 w-full bg-no-repeat bg-center bg-black relative"
        >
          <div className="w-full max-w-[1280px] bg-linear-to-r inset-0 mx-auto from-black from-2% via-transparent via-50% to-black to-96% absolute ">
            {" "}
          </div>
        </div>
      ) : (
        <div className="h-90 w-full bg-black relative text-white text-center flex items-center justify-center font-bold text-6xl">
          {details.title}
        </div>
      )}

      <div className="flex flex-row px-5 w-full max-w-[1280px] mx-auto gap-6">
        <Image
          src={
            details.posterPath
              ? `https://image.tmdb.org/t/p/w500${details.posterPath}`
              : "/poster-placeholder.jpg"
          }
          alt={details.title || "Plakat"}
          width={266}
          height={400}
          className="z-10 shrink-0 self-start w-[266px] h-[400px] -mt-[170px] object-cover rounded-md shadow-xl/35"
        />
        <div className="my-4 flex flex-col gap-1 min-w-[350px] flex-1">
          <p className="text-2xl">{details.title}</p>
          <p className="text-lg">
            {getType(details.mediaType)}
            {getYear(details.releaseDate) &&
              ` · ${getYear(details.releaseDate)}`}
          </p>
          {details.genres.length > 0 && (
            <div className="flex flex-row gap-2 flex-wrap">
              {details.genres.map((genre) => {
                return (
                  <p
                    className="border rounded-full px-2 py-1 text-xs"
                    key={genre.id}
                  >
                    {genre.name}
                  </p>
                );
              })}
            </div>
          )}

          <div className="mt-2">
            <p className="font-bold text-lg">Opis</p>

            {details.overview ? (
              <p className="text-lg">{details.overview}</p>
            ) : (
              <p className="text-lg opacity-50">Brak opisu do wyświetlenia</p>
            )}
          </div>
          <AddToList status={status} details={details} />
        </div>
      </div>
    </div>
  );
}
