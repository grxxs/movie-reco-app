import type { TMDBResponseElement } from "../lib/definitions";
import Image from "next/image";
import Link from "next/link";

function getType(name: "movie" | "tv" | "person") {
  switch (name) {
    case "movie":
      return "Film";
    case "tv":
      return "Serial";
    default:
      return "";
  }
}

function getYear(date?: string, air?: string) {
  return (date || air || "").slice(0, 4);
}

export default function SearchResult({ item }: { item: TMDBResponseElement }) {
  console.log(item);
  const year = getYear(item.release_date, item.first_air_date);
  return (
    <Link
      href={`/title/${item.media_type}/${item.id}`}
      className="flex gap-2 py-2 self-center w-1/3 hover:opacity-90 hover:bg-gray-200"
    >
      <Image
        src={
          item.poster_path
            ? `https://image.tmdb.org/t/p/w185${item.poster_path}`
            : "/poster-placeholder.jpg"
        }
        alt={item.title || item.name || "Plakat"}
        width={124}
        height={185}
        className="shrink-0 self-start w-[124px] h-[185px] object-cover"
      />

      <div className="min-w-0">
        <p className="font-bold text-xl">{item.title || item.name}</p>
        <p className="text-lg">
          {getType(item.media_type)}
          {year && ` · ${year}`}
        </p>
      </div>
    </Link>
  );
}
