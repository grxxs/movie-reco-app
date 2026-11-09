import { UserListType } from "@/app/lib/definitions";
import { UserCategoryListElement } from "./user-category-list-element";
import { FaCircleUser } from "react-icons/fa6";
import { getCurrentUser } from "@/app/lib/database/get-current-user";
import { redirect } from "next/navigation";
import Link from "next/link";
import { listStatusString } from "@/app/lib/definitions";

export default async function UserCategoryList({
  list,
  title,
}: {
  list: UserListType;
  title: string;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col gap-1 w-1/2">
      <div className="flex flex-row justify-between items-center w-full py-7 px-4 mb-3 rounded-lg shadow-lg/5 ">
        <div className="flex flex-row items-center gap-2">
          <FaCircleUser className="text-4xl" />
          <Link href="/list" className="font-bold text-lg hover:opacity-75">
            {user.username}
          </Link>
        </div>
        <div className="flex flex-row divide-x divide-gray-300 divide-solid">
          <Link
            href="/list/recent"
            className={`px-2 text-sm font-semibold ${title === listStatusString.recent ? "text-yellow-500" : "text-black hover:text-yellow-400 transition-colors ease-in-out duration-300"}`}
          >
            {listStatusString.recent}
          </Link>
          <Link
            href="/list/planned"
            className={`px-2 text-sm font-semibold ${title === listStatusString.planned ? "text-yellow-500 " : "text-black hover:text-yellow-400 transition-colors ease-in-out duration-300"}`}
          >
            {listStatusString.planned}
          </Link>
          <Link
            href="/list/watching"
            className={`px-2 text-sm font-semibold ${title === listStatusString.watching ? "text-yellow-500 " : "text-black hover:text-yellow-400 transition-colors ease-in-out duration-300"}`}
          >
            {listStatusString.watching}
          </Link>
          <Link
            href="/list/watched"
            className={`px-2 text-sm font-semibold ${title === listStatusString.watched ? "text-yellow-500 " : "text-black hover:text-yellow-400 transition-colors ease-in-out duration-300"}`}
          >
            {listStatusString.watched}
          </Link>
          <Link
            href="/list/rated"
            className={`px-2 text-sm font-semibold ${title === listStatusString.rated ? "text-yellow-500 " : "text-black hover:text-yellow-400 transition-colors ease-in-out duration-300"}`}
          >
            {listStatusString.rated}
          </Link>
        </div>
      </div>
      <div className="flex flex-col flex-wrap gap-4 divide-y divide-gray-300 divide-solid">
        {list.map((title) => (
          <UserCategoryListElement title={title} key={title.id} />
        ))}
      </div>
    </div>
  );
}
