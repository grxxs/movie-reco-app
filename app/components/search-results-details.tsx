import { TitleDetails, ListItem } from "../lib/definitions";
import { getType, getYear } from "../lib/format/fromat-helper";
import Rating from "./rating";
import Image from "next/image";
import AddToList from "./add-to-list";
import RatingNotLogged from "./rating-not-logged";

export function SearchResultDetails({
  details,
  isLoggedIn,
  listItem,
}: {
  details: TitleDetails;
  isLoggedIn: boolean;
  listItem: ListItem;
}) {
  let status: "logged" | "added" | "guest" = "guest";

  if (isLoggedIn && listItem === null) {
    status = "logged";
  } else if (isLoggedIn && listItem !== null) {
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
          className="h-70 w-full bg-no-repeat bg-position-[center_25%] bg-black relative"
        >
          <div className="w-full max-w-[1280px] bg-linear-to-r inset-0 mx-auto from-black from-2% via-transparent via-50% to-black to-96% absolute ">
            {" "}
          </div>
        </div>
      ) : (
        <div className="h-70 w-full bg-black relative text-white text-center flex items-center justify-center font-bold text-4xl">
          {details.title}
        </div>
      )}

      <div className="flex flex-row px-5 w-full max-w-[950px] mx-auto gap-6">
        <Image
          src={
            details.posterPath
              ? `https://image.tmdb.org/t/p/w500${details.posterPath}`
              : "/poster-placeholder.jpg"
          }
          alt={details.title || "Plakat"}
          width={220}
          height={330}
          className="z-10 shrink-0 self-start w-[220px] h-[330px] -mt-25 object-cover rounded-sm shadow-xl/25"
        />
        <div className="my-4 flex flex-col gap-1 min-w-[350px] flex-1">
          <p className="text-2xl self-start font-semibold">{details.title}</p>
          <p className="text-sm">
            {getType(details.mediaType)}
            {getYear(details.releaseDate) &&
              ` · ${getYear(details.releaseDate)}`}
          </p>
          {details.genres.length > 0 && (
            <div className="flex flex-row gap-2 flex-wrap">
              {details.genres.map((genre) => {
                return (
                  <p
                    className="border rounded-full px-1 py-0.5 text-xs"
                    key={genre.id}
                  >
                    {genre.name}
                  </p>
                );
              })}
            </div>
          )}

          <div className="mt-2">
            <p className="font-semibold text-lg">Opis</p>

            {details.overview ? (
              <p className="text-sm">{details.overview}</p>
            ) : (
              <p className="text-lg opacity-50">Brak opisu do wyświetlenia</p>
            )}
          </div>
        </div>

        <div className="self-start min-h-44 flex flex-col px-2 py-3 z-10 -mt-5 bg-white shadow-lg/10 rounded">
          {isLoggedIn ? (
            <Rating
              id={details.id}
              type={details.mediaType}
              rating={listItem?.rating ?? 0}
            />
          ) : (
            <RatingNotLogged />
          )}
          <AddToList status={status} details={details} />
        </div>
      </div>
    </div>
  );
}
