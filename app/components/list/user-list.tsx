import { UserListType } from "@/app/lib/definitions";
import { UserListElement } from "./user-list-element";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export function UserList({
  list,
  title,
  href,
}: {
  list: UserListType;
  title: string;
  href: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Link
        href={`list/${href}`}
        className="group inline-flex self-start items-center gap-0.5 text-xl hover:translate-x-1 transition-transform duration-350"
      >
        {title}
        <IoIosArrowForward className="opacity-0 text-lg translate-y-0.5 group-hover:opacity-100 transition-opacity duration-400" />
      </Link>
      <div className="flex flex-row flex-wrap gap-4">
        {list.slice(0, 5).map((title) => (
          <UserListElement title={title} key={title.id} />
        ))}
      </div>
    </div>
  );
}
