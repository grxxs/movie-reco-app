import { logout } from "@/app/lib/actions/logout";
import Button from "./button";
import { currentUser } from "../lib/database/get-current-user";
import Link from "next/link";
import LinkButton from "./linkbutton";

export default async function Header() {
  const user = await currentUser();
  return (
    <div className="flex flex-row gap-5 w-full justify-between px-5 py-3 bg-blue-950">
      <Link href="/" className="text-2xl text-white font-bold">
        MyApp
      </Link>
      {user ? (
        <div className="flex flex-row items-center  gap-4">
          <p className="text-white">
            Witaj, <span className="font-bold">{user.username}</span>
          </p>
          <form action={logout}>
            <Button type="submit">Wyloguj</Button>
          </form>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-4">
          <LinkButton href="/login" className=" hover:opacity-75 text-white ">
            Zaloguj
          </LinkButton>
          <LinkButton
            href="/register"
            className="border-transparent bg-blue-500 hover:bg-blue-700 text-white"
          >
            Zarejestruj
          </LinkButton>
        </div>
      )}
    </div>
  );
}
