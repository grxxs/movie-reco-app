import { getCurrentUser } from "../lib/database/get-current-user";
import { getUserList } from "../lib/database/get-productions";
import { redirect } from "next/navigation";
import { UserList } from "../components/list/user-list";
import LinkButton from "../components/linkbutton";
import { FaCircleUser } from "react-icons/fa6";
import { AscendingNumber } from "../components/ascending-number";

export default async function List() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const list = await getUserList(user.id);
  const watched = list.filter((title) => title.status === "WATCHED");
  const watching = list.filter((title) => title.status === "WATCHING");
  const toWatch = list.filter((title) => title.status === "PLANNED");
  const highestRating = list
    .filter((title) => title.rating !== null)
    .toSorted((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return (
    <div className="flex flex-col items-center my-8">
      <div className="flex flex-row justify-between items-center w-1/2 py-6 px-4 mb-3 rounded-lg shadow-lg/5 ">
        <div className="flex flex-row items-center gap-2">
          <FaCircleUser className="text-4xl" />
          <p className="font-bold text-lg">{user.username}</p>
        </div>
        <div className="flex flex-row divide-x divide-gray-300 divide-solid">
          <div className="flex flex-col items-center px-2 ">
            <AscendingNumber number={list.length} />
            <p className="text-xs">NA LIŚCIE</p>
          </div>
          <div className="flex flex-col items-center px-2 ">
            <AscendingNumber number={highestRating.length} />
            <p className="text-xs">OCENIONE</p>
          </div>
          <div className="flex flex-col items-center px-2 ">
            <AscendingNumber number={watched.length} />
            <p className="text-xs">OBEJRZANE</p>
          </div>
          <div className="flex flex-col items-center px-2 ">
            <AscendingNumber number={toWatch.length} />
            <p className="text-xs">ZAPLANOWANE</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {list.length > 0 ? (
          <UserList list={list} title="Ostatnio dodane" />
        ) : (
          <div className="flex flex-col gap-1 items-center mt-5">
            <p className="font-bold text-lg">
              Tutaj pojawi się twoja osobista lista
            </p>
            <p className="mb-2">
              Wyszukuj, oceniaj i dodawaj produkcje które cię interesują
            </p>
            <LinkButton
              href="/"
              className="text-lg bg-yellow-300 py-1.5 px-9 border-transparent hover:bg-yellow-400 transition-colors duration-200 ease-in-out"
            >
              Przeglądaj
            </LinkButton>
          </div>
        )}
        {toWatch.length > 0 && (
          <UserList list={toWatch} title="Do obejrzenia" />
        )}
        {watched.length > 0 && <UserList list={watched} title="Obejrzane" />}
        {watching.length > 0 && <UserList list={watching} title="W trakcie" />}
        {highestRating.length > 0 && (
          <UserList list={highestRating} title="Najwyżej ocenione" />
        )}
      </div>
    </div>
  );
}
