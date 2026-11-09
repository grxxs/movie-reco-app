import { UserListElementType } from "@/app/lib/definitions";
import Link from "next/link";
import Image from "next/image";
import { getTypeTMDB, getYear, getType } from "@/app/lib/format/fromat-helper";
import Rating from "../rating";

export function UserCategoryListElement({
  title,
}: {
  title: UserListElementType;
}) {
  const typeTMDB = getTypeTMDB(title.production.mediaType);
  return (
    <div className="flex flex-row items-center gap-4 pb-4">
      <Link
        href={`/title/${typeTMDB}/${title.production.tmdbId}`}
        className="shrink-0 hover:opacity-75 transition-opacity duration-200"
      >
        <Image
          src={
            title.production.posterPath
              ? `https://image.tmdb.org/t/p/w185${title.production.posterPath}`
              : "/poster-placeholder.jpg"
          }
          alt={title.production.title || "Plakat"}
          width={92}
          height={138}
          className="w-[92px] h-[138px] object-cover rounded"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <p className="font-semibold line-clamp-2">{title.production.title}</p>
        <p className="text-sm text-gray-500">
          {getType(getTypeTMDB(title.production.mediaType))}
          {" ·O "}
          {getYear(title.production.releaseDate?.toISOString()) ?? ""}
        </p>
      </div>
      <Rating
        id={title.production.tmdbId}
        type={getTypeTMDB(title.production.mediaType)}
        rating={title.rating ?? 0}
        size="small"
      />
    </div>
  );
}
