import { UserListElementType } from "@/app/lib/definitions";
import Link from "next/link";
import Image from "next/image";
import { getTypeTMDB } from "@/app/lib/format/fromat-helper";

export function UserListElement({ title }: { title: UserListElementType }) {
  const typeTMDB = getTypeTMDB(title.production.mediaType);
  return (
    <Link
      href={`/title/${typeTMDB}/${title.production.tmdbId}`}
      className="w-[124px] flex flex-col items-center pb-3 rounded hover:shadow-xl"
    >
      <Image
        src={
          title.production.posterPath
            ? `https://image.tmdb.org/t/p/w185${title.production.posterPath}`
            : "/poster-placeholder.jpg"
        }
        alt={title.production.title || "Plakat"}
        width={124}
        height={185}
        className="shrink-0 self-start w-[124px] h-[185px] object-cover rounded-t"
      />
      <div>
        <p className="text-wrap text-xs line-clamp-2 min-h-8 text-center">
          {title.production.title}
        </p>
      </div>
    </Link>
  );
}
