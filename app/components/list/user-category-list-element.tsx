import { UserListElementType } from "@/app/lib/definitions";
import Link from "next/link";
import Image from "next/image";
import { getTypeTMDB, getYear, getType } from "@/app/lib/format/fromat-helper";
import Rating from "../title/rating";
import SelectStatus from "./status-select";
import { deleteTitle } from "@/app/lib/actions/delete-title";

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
          {" · "}
          {getYear(title.production.releaseDate?.toISOString()) ?? ""}
        </p>
      </div>
      <div className="flex flex-col gap-2 w-32 shrink-0">
        <Rating
          id={title.production.tmdbId}
          type={getTypeTMDB(title.production.mediaType)}
          rating={title.rating ?? 0}
          size="small"
        />
        <SelectStatus
          id={title.id}
          titleStatus={title.status}
          key={title.status}
        />
        <form action={deleteTitle} className="text-center">
          <input type="hidden" name="id" value={title.id} />
          <button
            type="submit"
            className="text-xs font-semibold text-red-600 hover:text-red-400 transition-colors duration-200 ease-in-out cursor-pointer"
          >
            Usuń z listy
          </button>
        </form>
      </div>
    </div>
  );
}
