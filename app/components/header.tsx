import { logout } from "@/app/lib/actions/logout";
import Button from "./button";
import { getCurrentUser } from "../lib/database/get-current-user";
import Link from "next/link";
import LinkButton from "./linkbutton";

export default async function Header() {
  const user = await getCurrentUser();
  return (
    <div className="flex flex-row gap-5 w-full justify-between px-5 py-3 bg-blue-950">
      <Link href="/" className="text-2xl text-white font-bold">
        MyApp
      </Link>
      {user ? (
        <div className="flex flex-row items-center  gap-4">
          <p className="text-white">
            Witaj,{" "}
            <Link
              href="/list"
              className="font-bold hover:opacity-75 transition-all ease-in-out duration-100"
            >
              {user.username}
            </Link>
          </p>
          <form action={logout}>
            <Button type="submit" className="cursor-pointer">
              Wyloguj
            </Button>
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
